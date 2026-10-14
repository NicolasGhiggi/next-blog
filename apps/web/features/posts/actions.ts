"use server"

import { revalidatePath } from "next/cache"
import { createPost } from "@workspace/db/models/post"
import { auth0 } from "@/lib/auth0"

export async function newPost(formData: FormData) {
    const session = await auth0.getSession();
    if (!session) throw new Error("Unauthorized");

    const title = String(formData.get("title") ?? "").trim();
    if (!title) throw new Error("Title is required");

    await createPost({
        userId: session.user.sub,
        title,
        description: String(formData.get("description") ?? ""),
        cover: String(formData.get("cover") ?? ""),
    });

    revalidatePath("/feed");
}