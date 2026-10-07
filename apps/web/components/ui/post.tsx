"use client"

import Link from "next/link"
import Image from "next/image"
import { PlusIcon } from "lucide-react"
import { ComponentProps, FC } from "react"
import { Post } from "@workspace/ui/interfaces/post"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"

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
                        <AvatarImage src={post.owner.avatar} alt={post.owner.username} />
                        <AvatarFallback>{post.owner.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Link href={`/users/${post.owner.id}`}>
                        <span className="truncate text-balance leading-relaxed font-mono hover:text-primary transition cursor-pointer">
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
                <div className="flex flex-col gap-2 mb-2">
                    <h2 className="text-xl font-bold text-balance leading-relaxed">{post.title}</h2>
                    {post.description &&
                        <p className="text-balance leading-relaxed">
                            {post.description}
                        </p>
                    }
                </div>
                <div className="group relative aspect-16/10 w-full overflow-hidden rounded-xl cursor-pointer">
                    <Image
                        src={post.cover}
                        alt={`Post of ${post.owner.username}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover group-hover:scale-105 transition"
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