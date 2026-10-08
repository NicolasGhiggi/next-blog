import * as z from "zod"

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Email is required")
        .pipe(z.email("Please enter a valid email address")),
    password: z
        .string()
        .trim()
        .min(1, "Password is required"),
})

export type loginSchemaType = z.infer<typeof loginSchema>