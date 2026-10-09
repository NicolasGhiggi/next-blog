import { FC, ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/features/auth/actions"
import { AppLayout } from "@/components/layout/app-layout"

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = async ({ children }) => {
    const user = await auth.getUser()
    if (!user) redirect("/auth/login")

    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}

export default Layout
