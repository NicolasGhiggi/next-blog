import Link from "next/link"
import type { Metadata } from "next"
import { LoginForm } from "@/features/auth/components/login-form"

export const metadata: Metadata = {
    title: "Login",
    description: "Log in to your account",
}

const Page = () => {
    return (
        <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 bg-background">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to your account to continue.
                    </p>
                </div>

                <LoginForm />

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Page
