import { z, ZodSchema } from "zod";

export const accountSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters"),
    displayName: z.string().min(2, "Display name must be at least 2 characters").max(50, "Display name must be at most 50 characters"),
});

export type AccountFormData = z.infer<typeof accountSchema>;

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data)
    if (!result.success) {
        const errors = result.error.issues.map((error) => error.message);
        const uniqueErrors = Array.from(new Set(errors));
        throw new Error(uniqueErrors.join(", "));
    }
    return result.data
}

export const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    releaseId: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
