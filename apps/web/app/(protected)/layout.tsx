import { FC, ReactNode } from "react"
import { redirect } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { auth0 } from "@/lib/auth0"

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = async ({ children }) => {
    const session = await auth0.getSession()
    if (!session) redirect("/auth/login")

    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}

export default Layout
