import Link from "next/link"
import type { Metadata } from "next"
import { RegisterForm } from "@/features/auth/components/register-form"

export const metadata: Metadata = {
    title: "Create account",
    description: "Create your account",
}

const Page = () => {
    return (
        <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 bg-background">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Fill in the details below to get started.
                    </p>
                </div>
                <RegisterForm />
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-border" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Page