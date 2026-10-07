import Link from "next/link"
import { Triangle } from "lucide-react"
import { APP_NAME } from "@/lib/constants"

const AppFooter = () => {
    return (
        <footer className="mt-auto border-t">
            <div className="flex flex-col gap-3 px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Triangle
                        className="size-4 text-foreground"
                        fill="currentColor"
                    />

                    <span className="font-medium text-foreground">
                        {APP_NAME}
                    </span>

                    <span className="text-border">/</span>

                    <span>© {new Date().getFullYear()}</span>
                </div>

                <nav className="flex items-center gap-4">
                    <Link
                        href="/blog"
                        className="transition-colors hover:text-foreground"
                    >
                        Blog
                    </Link>

                    <Link
                        href="/about"
                        className="transition-colors hover:text-foreground"
                    >
                        About
                    </Link>

                    <a
                        href="https://github.com/NicolasGhiggi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-foreground"
                    >
                        GitHub
                    </a>

                    <a
                        href="/rss.xml"
                        className="transition-colors hover:text-foreground"
                    >
                        RSS
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export { AppFooter }
