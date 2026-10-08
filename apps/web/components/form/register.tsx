"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@workspace/ui/components/toast"
import { Button } from "@workspace/ui/components/button"
import { FieldGroup } from "@workspace/ui/components/field"
import { FormTextField } from "@/components/ui/form-text-field"
import { registerSchema, registerSchemaType } from "@/schemas/register"

const RegisterForm = () => {
    const form = useForm<registerSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            displayName: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (data: registerSchemaType) => {
        const id = toast.add({
            title: "You submitted the following values:",
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            actionProps: {
                children: "Undo",
                onClick() {
                    toast.close(id)
                },
            },
        })
    }

    return (
        <form
            id="form-register"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
        >
            <FieldGroup className="gap-5">
                <FormTextField
                    control={form.control}
                    name="displayName"
                    label="Display name"
                    placeholder="John Doe"
                    description="The name you want to show to everyone"
                    autoComplete="name"
                />

                <FormTextField
                    control={form.control}
                    name="username"
                    label="Username"
                    placeholder="john_doe"
                    description="3-20 characters: letters, numbers, _ and ."
                    autoComplete="username"
                />

                <FormTextField
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                />

                <FormTextField
                    control={form.control}
                    name="phone"
                    label="Phone"
                    type="tel"
                    placeholder="+393331234567"
                    description="Include the country code, without spaces"
                    autoComplete="tel"
                />

                <FormTextField
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    description="At least 8 characters, with upper/lowercase, a number and a symbol"
                    autoComplete="new-password"
                />

                <FormTextField
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    autoComplete="new-password"
                />

                <Button
                    type="submit"
                    className="mt-1 w-full"
                    disabled={form.formState.isSubmitting}
                >
                    Create account
                </Button>
            </FieldGroup>
        </form>
    )
}

export { RegisterForm }
