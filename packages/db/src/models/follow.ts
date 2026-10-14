import { RowDataPacket } from "mysql2/promise"
import { pool } from ".."

export const follow = async (followerId: string, followingId: string) => {
    if (followerId === followingId) throw new Error("You cannot follow yourself");

    await pool.execute(
        "INSERT IGNORE INTO follows (follower_id, following_id) VALUES (?, ?)",
        [followerId, followingId]
    );
}

export const unfollow = async (followerId: string, followingId: string) => {
    await pool.execute(
        "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
        [followerId, followingId]
    );
}

export const isFollowing = async (followerId: string, followingId: string) => {
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ? LIMIT 1",
        [followerId, followingId]
    );
    return rows.length > 0;
}

export const countFollowers = async (userId: string) => {
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT COUNT(*) AS n FROM follows WHERE following_id = ?",
        [userId]
    );
    const count = rows?.[0]?.n ?? 0;
    return Number(count);
}
