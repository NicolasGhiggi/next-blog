"use client"

import Link from "next/link"
import Image from "next/image"
import { PlusIcon } from "lucide-react"
import { ComponentProps, FC } from "react"
import { Post } from "@workspace/ui/interfaces/post"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { BLUR_DATA_URL } from "@/lib/constants"

interface PostCardProps extends ComponentProps<"div"> {
    post: Post
    onFollow: () => void
}

const PostCard: FC<PostCardProps> = ({ post, onFollow, ...props }) => {
    return (
        <Card {...props} size="sm">
            <CardHeader>
                <CardTitle className="flex min-w-0 items-center gap-2">
                    <Avatar>
                        <AvatarImage
                            src={post.owner.avatar}
                            alt={post.owner.username}
                        />
                        <AvatarFallback>
                            {post.owner.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Link href={`/profile/${post.owner.username}`}>
                        <span className="cursor-pointer truncate font-mono leading-relaxed text-balance transition hover:text-primary">
                            @{post.owner.username}
                        </span>
                    </Link>
                </CardTitle>
                <CardAction>
                    <Button size="sm" onClick={onFollow}>
                        <PlusIcon /> Follow
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="mb-2 flex flex-col gap-2">
                    <h2 className="text-xl leading-relaxed font-bold text-balance">
                        {post.title}
                    </h2>
                    {post.description && (
                        <p className="leading-relaxed text-balance">
                            {post.description}
                        </p>
                    )}
                </div>
                <div className="group relative aspect-16/10 w-full cursor-pointer overflow-hidden rounded-xl">
                    <Image
                        src={post.cover}
                        alt={`Post of ${post.owner.username}`}
                        fill
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover transition group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl inset-ring-1 inset-ring-foreground/10" />
                </div>
            </CardContent>
        </Card>
    )
}

interface PostListProps extends ComponentProps<"section"> {
    label: string
}

const PostList: FC<PostListProps> = ({ label, children }) => {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="sr-only">{label}</h2>
            {children}
        </section>
    )
}

export { PostCard, PostList }