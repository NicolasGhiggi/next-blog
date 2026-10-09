import Link from "next/link"
import { TriangleIcon } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@workspace/ui/components/navigation-menu"

import { APP_NAME, ROUTES } from "@/lib/constants"
import { ThemeToggle } from "@workspace/ui/components/theme-toggle"
import { AuthProfile } from "@/components/ui/auth-profile"

const AppHeader = async () => {
    return (
        <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background border-b">
            <div
                className="mx-auto flex h-(--header-height) items-center gap-2 border-x pr-2 pl-4 after:z-1 md:max-w-3xl">
                <div className="flex items-center justify-end gap-2">
                    <TriangleIcon className="size-5" fill="currentColor" /> {APP_NAME}
                </div>
                <div className="flex-1" />
                <NavigationMenu>
                    <NavigationMenuList>
                        {ROUTES.map((route, idx) => (
                            <NavigationMenuItem key={idx}>
                                <NavigationMenuLink render={<Link href={route.url} />}>
                                    {route.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <ThemeToggle />
                <AuthProfile />
            </div>
        </header>
    )
}

export { AppHeader }