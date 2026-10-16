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
import { cn } from "@workspace/ui/lib/utils"

interface PostCardProps extends ComponentProps<"div"> {
    post: Post
    onFollow: () => void
}

const PostCard: FC<PostCardProps> = ({ post, onFollow, className, ...props }) => {
    return (
        <Card
            {...props}
            size="sm"
            className={cn("overflow-hidden transition-shadow hover:shadow-md", className)}
        >
            {/* 1. Author: avatar + username on the left, secondary action on the right */}
            <CardHeader>
                <CardTitle className="flex min-w-0 items-center gap-2.5">
                    <Avatar>
                        <AvatarImage
                            src={post.owner.avatar}
                            alt={post.owner.username}
                        />
                        <AvatarFallback>
                            {post.owner.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <Link
                        href={`/profile/${post.owner.username}`}
                        className="min-w-0 truncate font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        @{post.owner.username}
                    </Link>
                </CardTitle>

                <CardAction>
                    {/* Outline variant: the cover and title stay the main focus */}
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onFollow}
                        aria-label={`Follow ${post.owner.username}`}
                    >
                        <PlusIcon /> Follow
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                {/* 2. Cover: the whole image is a link to the post */}
                <Link
                    href={`/post/${post.id}`}
                    className="group relative block aspect-16/10 w-full overflow-hidden rounded-xl bg-muted"
                >
                    <Image
                        src={post.cover}
                        alt={`Cover of "${post.title}"`}
                        fill
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl inset-ring-1 inset-ring-foreground/10" />
                </Link>

                {/* 3. Content: strong title, quieter description, both clamped for uniform cards */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="line-clamp-2 text-lg leading-snug font-semibold tracking-tight text-balance">
                        <Link
                            href={`/post/${post.id}`}
                            className="transition-colors hover:text-primary"
                        >
                            {post.title}
                        </Link>
                    </h2>

                    {post.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                            {post.description}
                        </p>
                    )}
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