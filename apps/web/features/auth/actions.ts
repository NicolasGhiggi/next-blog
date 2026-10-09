import { cache } from "react"
import { auth0 } from "@/lib/auth0"

const getSession = cache(
    async () => auth0.getSession()
)

const getUser = async () => {
    const session = await getSession()
    if (!session) return null

    // todo: get db data user
    return session.user
}

const isLoggedIn = async () => !!(await getSession())

export const auth = { getUser, isLoggedIn }