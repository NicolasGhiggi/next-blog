"use client"

import Link from "next/link"
import { CogIcon, LogOutIcon, PlusSquareIcon, TriangleIcon, UserIcon } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@workspace/ui/components/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"

import { APP_NAME, ROUTES } from "@/lib/constants"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Button } from "@workspace/ui/components/button"
import { ThemeToggle } from "@workspace/ui/components/theme-toggle"

const AppHeader = () => {
    return (
        <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background border-b">
            <div
                className="mx-auto flex h-(--header-height) items-center gap-2 border-x pr-2 pl-4 after:z-1 md:max-w-3xl">
                <div className="flex items-center justify-end gap-2">
                    <TriangleIcon fill="currentColor" /> {APP_NAME}
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
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                                              <Button variant="ghost" size="icon-lg">
                                                 <Avatar>
                                                     <AvatarImage
                                                         src={"https://avatars.githubusercontent.com/u/124599?v=4"} />
                                                     <AvatarFallback>NB</AvatarFallback>
                                                 </Avatar>
                                             </Button>

                                         } />
                    <DropdownMenuContent className="w-45" align="end">
                        <DropdownMenuItem>
                            <UserIcon /> Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CogIcon /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOutIcon /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export { AppHeader }