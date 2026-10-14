import { ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { User } from "#models/user"
import { pool } from "#connection"

export interface Post {    
    id: number
    userId: string
    title: string
    description: string | null
    cover: string | null
    createdAt: Date
    updatedAt: Date
    owner?: User
}

export const createPost = async (input: {
    userId: string;
    title: string;
    description?: string;
    cover?: string;
}) => {
    const [res] = await pool.execute<ResultSetHeader>(
        "INSERT INTO posts (user_id, title, description, cover) VALUES (?, ?, ?, ?)",
        [input.userId, input.title, input.description ?? null, input.cover ?? null]
    );
    return res.insertId;
}

export const getPostsByUser = async (userId: string) => {
    const [rows] = await pool.execute<(Post & RowDataPacket)[]>(
        "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );
    return rows;
}

export const getFeed = async (mySub: string, limit = 20) => {
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
