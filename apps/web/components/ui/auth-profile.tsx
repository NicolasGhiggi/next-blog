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
                <Link href="/signup">
                    <Button>
                        Signup
                    </Button>
                </Link>
                <Link href="/login">
                    <Button variant="secondary">
                        Login
                    </Button>
                </Link>
            </>
        )
    }

    return (
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
                <Link href="/settings?tab=account">
                    <DropdownMenuItem>
                        <UserIcon /> Account
                    </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                    <DropdownMenuItem>
                        <CogIcon /> Settings
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOutIcon /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { AuthProfile }