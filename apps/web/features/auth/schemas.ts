import * as z from "zod"

const PASSWORD_REGEX = {
    lower: /[a-z]/,
    upper: /[A-Z]/,
    number: /\d/,
    special: /[^A-Za-z0-9]/,
}

export const registerSchema = z
    .object({
        displayName: z
            .string()
            .trim()
            .min(2, "Display name must be at least 2 characters")
            .max(50, "Display name must be at most 50 characters"),

        username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(
                /^[a-zA-Z0-9_.]+$/,
                "Username can only contain letters, numbers, underscores and dots"
            )
            .regex(/^[a-zA-Z]/, "Username must start with a letter")
            .toLowerCase(),

        email: z
            .string()
            .trim()
            .toLowerCase()
            .min(1, "Email is required")
            .pipe(z.email("Please enter a valid email address")),

        phone: z
            .string()
            .trim()
            .min(1, "Phone number is required")
            .regex(
                /^\+?[1-9]\d{7,14}$/,
                "Enter a valid phone number (e.g. +393331234567)"
            ),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(72, "Password must be at most 72 characters")
            .regex(PASSWORD_REGEX.lower, "Password must contain a lowercase letter")
            .regex(PASSWORD_REGEX.upper, "Password must contain an uppercase letter")
            .regex(PASSWORD_REGEX.number, "Password must contain a number")
            .regex(PASSWORD_REGEX.special, "Password must contain a special character"),

        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type registerSchemaType = z.infer<typeof registerSchema>

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