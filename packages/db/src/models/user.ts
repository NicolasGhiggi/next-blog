export interface User {
    sub: string
    email: string
    name?: string
    nickname?: string
    picture?: string
    emailVerified?: boolean
    createdAt?: string
    updatedAt?: string
}