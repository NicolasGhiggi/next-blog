import { FC, ReactNode } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { DotBackground } from "@/components/ui/dot-background"

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="relative">
            <AppHeader />
            <DotBackground fade />
            <div className="relative mx-auto max-w-screen md:max-w-3xl border-x bg-background">
                {children}
            </div>
        </div>
    )
}

export default Layout