import "server-only"
import { cache } from "react"
import { management } from "@/lib/auth0-management"
import type { User } from "@workspace/db/models/user"

export const getPublicProfile = cache(
    async (sub: string): Promise<User | null> => {
        try {
            const user = await management.users.get(sub)

            return {
                sub: user.sub,
                email: user.email ?? "",
                name: user.name,
                nickname: user.nickname,
                picture: user.picture,
                emailVerified: user.email_verified,
                createdAt: user.created_at
                    ? new Date(user.created_at).toISOString()
                    : undefined,
                updatedAt: user.updated_at
                    ? new Date(user.updated_at).toISOString()
                    : undefined,
            }
        } catch {
            return null
        }
    }
)