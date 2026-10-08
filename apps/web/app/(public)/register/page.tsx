import type { Metadata } from "next"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card"
import { RegisterForm } from "@/components/form/register"

export const metadata: Metadata = {
    title: "Create account",
    description: "Sign up to get started",
}

const Page = () => {
    return (
        <div className="flex items-center justify-center p-2">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>
                        Fill in the details below to get started
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RegisterForm />
                </CardContent>

                <CardFooter className="justify-center text-sm text-muted-foreground">
                    Already have an account?&nbsp;
                    <Link
                        href="/login"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page