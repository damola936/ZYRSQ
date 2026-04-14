"use server"

import { redirect, unstable_rethrow } from "next/navigation"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { accountSchema, validateWithZodSchema } from "@/lib/validations";
import { PlanType, UserRole } from "@/lib/generated/prisma";
import bcrypt from "bcryptjs";
import { postSchema } from "@/lib/validations";
import { UserProfileOptions } from "./types";

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

    // Optimized: Only fetch essential user data by default
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            username: true,
            displayName: true,
            role: true,
            avatarUrl: true,
            plan: true,
            createdAt: true,
        }
    })
    return user
}

export const getUserProfile = async (options: UserProfileOptions = {}) => {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    if (!userId) return null;

    const includeObject: any = {};
    if (options.posts) includeObject.posts = { take: 10, orderBy: { createdAt: 'desc' } };
    if (options.comments) includeObject.comments = true;
    if (options.releases) includeObject.releases = {
        include: {
            collaborations: {
                include: {
                    musician: true,
                    producer: true
                }
            }
        }
    };
    if (options.postLikes) includeObject.postLikes = true;
    if (options.followers) includeObject.followers = true;
    if (options.following) includeObject.following = true;
    if (options.collaborations) includeObject.collaborations = true;
    if (options.producedWorks) includeObject.producedWorks = true;
    if (options.reviews) includeObject.reviews = true;
    if (options.notifications) includeObject.notifications = { take: 5, orderBy: { createdAt: 'desc' } };
    if (options.sentMessages) includeObject.sentMessages = { take: 10, orderBy: { createdAt: 'desc' } };
    if (options.receivedMessages) includeObject.receivedMessages = { take: 10, orderBy: { createdAt: 'desc' } };
    if (options.studioProjects) includeObject.studioProjects = true;
    if (options.projectCollaborations) includeObject.projectCollaborations = true;
    if (options.uploadedTracks) includeObject.uploadedTracks = true;
    if (options.projectComments) includeObject.projectComments = true;

    const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: Object.keys(includeObject).length > 0 ? includeObject : undefined
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

export const fetchAllUsersByRole = async (role: UserRole) => {
    return prisma.user.findMany({
        where: {
            role,
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export const fetchAllPosts = async () => {
    return prisma.post.findMany({
        orderBy: [
            {
                likes: {
                    _count: "desc"
                }
            },
            {
                createdAt: "desc"
            }
        ],
        include: {
            author: true,
            release: {
                include: {
                    collaborations: {
                        include: {
                            musician: true,
                            producer: true
                        }
                    }
                }
            },
            likes: true,
            comments: true
        }
    });
}

export async function createPostAction(prevState: any, formData: FormData) {
    const user = await isUserLoggedIn()
    if (!user) {
        return { message: "User not logged in", error: true }
    }
    try {
        const rawData = Object.fromEntries(formData) as any;
        const { title, content, releaseId } = rawData;
        const validatedData = validateWithZodSchema(postSchema, { title, content, releaseId })
        const post = await prisma.post.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                releaseId: validatedData.releaseId,
                userId: user.id
            }
        })
        console.log("Post created:", post);
        revalidatePath("/explore/posts")
        return { message: "Post created successfully", error: false }
    } catch (error) {
        return renderError(error)
    }
}