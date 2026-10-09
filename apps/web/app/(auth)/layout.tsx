// app/(auth)/layout.tsx
import { FC, ReactNode } from "react"
import Link from "next/link"
import { Triangle } from "lucide-react"
import { DotBackground } from "@/components/ui/dot-background"
import { APP_NAME } from "@/lib/constants"

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <DotBackground fade />
            <main className="relative mx-auto flex w-full max-w-screen flex-1 flex-col border-x bg-background/50 md:max-w-3xl">
                <Link
                    href="/"
                    className="flex w-fit items-center gap-2 p-6"
                >
                    <Triangle className="size-5" fill="currentColor" />
                    <span className="font-medium">{APP_NAME}</span>
                </Link>
                {children}
            </main>
        </div>
    )
}

export default Layout