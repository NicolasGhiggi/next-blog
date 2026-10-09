import Link from "next/link"
import { CogIcon, LogOutIcon, UserIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { auth0 } from "@/lib/auth0"

const AuthProfile = async () => {
    const session = await auth0.getSession()

    if (!session) {
        return (
            <>
                <a href="/auth/login?screen_hint=signup">
                    <Button>
                        Signup
                    </Button>
                </a>
                <a href="/auth/login">
                    <Button variant="secondary">
                        Login
                    </Button>
                </a>
            </>
        )
    }

    const user = session.user

    const initials = (user.name ?? user.email ?? "?").slice(0, 2).toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                                      <Button variant="ghost" size="icon-lg">
                                         <Avatar>
                                             <AvatarImage src={user.picture} />
                                             <AvatarFallback>{initials}</AvatarFallback>
                                         </Avatar>
                                     </Button>

                                 } />
            <DropdownMenuContent className="w-45" align="end">
                <DropdownMenuItem render={<Link href="/settings?tab=account" />}>
                    <UserIcon /> Account
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/settings" />}>
                    <CogIcon /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<a href="/auth/logout" />}>
                    <LogOutIcon /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { AuthProfile }