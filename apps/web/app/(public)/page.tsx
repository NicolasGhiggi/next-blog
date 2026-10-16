"use client"

import { PostCard, PostList } from "@/components/ui/post"
import { Post } from "@workspace/db/models/post"

const post: Post = {
    id: 1,
    userId: "1111-2222-3333-4444-5555",
    cover: "/assets/post/post_01.jpg",
    title: "First post",
    description: "This is the first post, description for example",
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
        sub: "1111-2222-3333-4444-5555",
        nickname: "john_doe",
        email: "john.doe@example.com",
        picture: "https://avatars.githubusercontent.com/u/124599?v=4",
    }
}

const Page = () => {
    return (
        <div className="flex flex-col p-2">
            <h1 className="sr-only">Home</h1>
            <PostList label="Post section">
                <PostCard
                    post={post}
                    onFollow={() => alert("todo: Follow")}
                />
            </PostList>
        </div>
    )
}

export default Page