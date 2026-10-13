import mysql, { type RowDataPacket, type ResultSetHeader } from "mysql2/promise"

const globalForDb = globalThis as unknown as { pool?: mysql.Pool };

export const pool =
    globalForDb.pool ??
    mysql.createPool({
        uri: process.env.DATABASE_URL,
        connectionLimit: 10,
        dateStrings: false,
    });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

// ---------- Types ----------
export type Post = {
    id: number;
    user_id: string;
    title: string;
    description: string | null;
    cover: string | null;
    created_at: Date;
    updated_at: Date;
};

// ---------- Posts ----------
export async function createPost(input: {
    userId: string;
    title: string;
    description?: string;
    cover?: string;
}) {
    const [res] = await pool.execute<ResultSetHeader>(
        "INSERT INTO posts (user_id, title, description, cover) VALUES (?, ?, ?, ?)",
        [input.userId, input.title, input.description ?? null, input.cover ?? null]
    );
    return res.insertId;
}

export async function getPostsByUser(userId: string) {
    const [rows] = await pool.execute<(Post & RowDataPacket)[]>(
        "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );
    return rows;
}

export async function getFeed(mySub: string, limit = 20) {
    const [rows] = await pool.execute<(Post & RowDataPacket)[]>(
        `SELECT p.* FROM posts p
     JOIN follows f ON f.following_id = p.user_id
     WHERE f.follower_id = ?
     ORDER BY p.created_at DESC
     LIMIT ${Number(limit)}`,
        [mySub]
    );
    return rows;
}

export async function follow(followerId: string, followingId: string) {
    if (followerId === followingId) throw new Error("You cannot follow yourself");

    await pool.execute(
        "INSERT IGNORE INTO follows (follower_id, following_id) VALUES (?, ?)",
        [followerId, followingId]
    );
}

export async function unfollow(followerId: string, followingId: string) {
    await pool.execute(
        "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
        [followerId, followingId]
    );
}

export async function isFollowing(followerId: string, followingId: string) {
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ? LIMIT 1",
        [followerId, followingId]
    );
    return rows.length > 0;
}

export async function countFollowers(userId: string) {
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT COUNT(*) AS n FROM follows WHERE following_id = ?",
        [userId]
    );
    const count = rows?.[0]?.n ?? 0;
    return Number(count);
}