"use client"

import { PostCard, PostList } from "@/components/ui/post"

const post = {
    id: "aaaa-bbbb-cccc-dddd-eeee",
    cover: "/assets/post/post_01.jpg",
    title: "First post",
    description: "This is the first post, description for example",
    createdAt: new Date(),
    owner: {
        id: "1111-2222-3333-4444-5555",
        username: "john_doe",
        avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    }
}

const Page = () => {
    return (
        <div className="flex flex-col p-2 min-h-[calc(100vh-var(--header-height)-1px)]">
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