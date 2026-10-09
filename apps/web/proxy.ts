import { NextRequest, NextResponse } from "next/server"
import { auth0 } from "@/lib/auth0"

const PROTECTED = ["/settings", "/dashboard"]

const isProtected = (path: string) =>
    PROTECTED.some(p => path === p || path.startsWith(`${p}/`))

export async function proxy(request: NextRequest) {
    const authResponse = await auth0.middleware(request)

    const { pathname, search } = request.nextUrl

    if (pathname.startsWith("/auth")) return authResponse

    if (isProtected(pathname)) {
        const session = await auth0.getSession(request)

        if (!session) {
            const loginUrl = new URL("/auth/login", request.nextUrl.origin)
            loginUrl.searchParams.set("returnTo", pathname + search)
            return NextResponse.redirect(loginUrl)
        }
    }

    return authResponse
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}
