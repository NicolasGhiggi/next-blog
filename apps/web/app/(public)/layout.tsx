import { FC, ReactNode } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { DotBackground } from "@/components/ui/dot-background"
import { AppFooter } from "@/components/layout/app-footer"

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            <DotBackground fade />
            <div className="relative mx-auto flex w-full max-w-screen flex-1 flex-col border-x bg-background/50 md:max-w-3xl">
                <main className="flex-1 flex flex-col">
                    {children}
                </main>
                <AppFooter />
            </div>
        </div>
    )
}

export default Layout
