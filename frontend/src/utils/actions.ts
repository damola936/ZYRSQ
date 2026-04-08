"use server"

import { redirect, unstable_rethrow } from "next/navigation"
import { createClient } from "@/utils/supabase/server";
import { uploadImagesToBucket, uploadImageToBucket, deleteImageFromBucket } from "@/utils/supabase-image-upload-delete";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { validateWithZodSchema, accountSchema } from "@/lib/validations";
import { UserRole, PlanType } from "@/lib/generated/prisma";
import bcrypt from "bcryptjs";

const renderError = (error: unknown): { message: string, error: boolean } => {
    console.log(error);
    return {
        message: error instanceof Error ? error.message : "Error occurred.",
        error: true,
    };
};

export const isUserLoggedIn = async () => {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    if (!userId) return null;
    const userProfile = await prisma.user.findUnique({
        where: { id: userId }
    })
    return userProfile
}

export async function createUserAction(prevState: any, formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData) as any;
        const role = rawData.role.toString().toUpperCase() as UserRole
        const plan = rawData.planId.toString().toUpperCase() as PlanType
        const { email, password, username, displayName, skills: rawSkills, genres: rawGenres } = rawData;
        const validatedData = validateWithZodSchema(accountSchema, { email, password, username, displayName })

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        const skills = rawSkills ? rawSkills.toString().split(",").map((s: string) => s.trim()).filter(Boolean) : [];
        const genres = rawGenres ? rawGenres.toString().split(",").map((s: string) => s.trim()).filter(Boolean) : [];

        // Remove fields that are either handled or invalid in Prisma schema
        const {
            role: _, planId: __, email: ___, password: ____,
            username: _____, displayName: ______,
            skills: _______, genres: ________, ...rest
        } = rawData;

        const user = await prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                username: validatedData.username,
                displayName: validatedData.displayName,
                role,
                plan,
                skills,
                genres,
                ...rest
            }
        })
        console.log("User created:", user);
        return { message: "User created successfully", error: false }

    } catch (error) {
        return renderError(error)
    }
}

export async function loginUserAction(prevState: any, formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { message: "Email and password are required", error: true };
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { message: "Invalid email or password", error: true };
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return { message: "Invalid email or password", error: true };
        }

        const cookieStore = await cookies();
        cookieStore.set("userId", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        // redirect to homepage on success
        return redirect("/");
    } catch (error) {
        unstable_rethrow(error); // rethrow the error to the client
        return renderError(error);
    }
}

export async function signOutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("userId");
    revalidatePath("/")
    redirect("/")
}

export const fetchAllUsersByRole = async (role:UserRole) => {
    const users = await prisma.user.findMany({
        where: {
            role,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return users;
}