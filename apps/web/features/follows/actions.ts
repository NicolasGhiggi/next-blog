"use server"

import { revalidatePath } from "next/cache"
import { follow, unfollow } from "@workspace/db/models/follow"
import { auth0 } from "@/lib/auth0"

export async function toggleFollow(targetSub: string, shouldFollow: boolean) {
    const session = await auth0.getSession();
    if (!session) throw new Error("Unauthorized");

    if (shouldFollow) await follow(session.user.sub, targetSub);
    else await unfollow(session.user.sub, targetSub);

    revalidatePath("/feed");
}