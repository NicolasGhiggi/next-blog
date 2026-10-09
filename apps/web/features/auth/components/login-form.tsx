"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@workspace/ui/components/toast"
import { Button } from "@workspace/ui/components/button"
import { FieldGroup } from "@workspace/ui/components/field"
import { FormTextField } from "@/components/ui/form-text-field"
import { loginSchema, loginSchemaType } from "@/features/auth/schemas"

const LoginForm = () => {
    const form = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: loginSchemaType) => {
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
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup className="gap-5">
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
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                />

                <Button
                    type="submit"
                    className="mt-1 w-full"
                    disabled={form.formState.isSubmitting}
                >
                    Log In
                </Button>
            </FieldGroup>
        </form>
    )
}

export { LoginForm }
