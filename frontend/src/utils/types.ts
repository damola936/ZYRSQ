import { Prisma } from "@/lib/generated/prisma/client";

export type ActionFunction = (prevState: any, formData: FormData) => Promise<{ message: string, error?: boolean }>