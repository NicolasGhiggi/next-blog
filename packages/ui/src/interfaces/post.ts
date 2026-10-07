export interface Post {
    id: string;
    cover: string;
    title: string;
    description?: string;
    createdAt: Date;
    owner: {
        id: string;
        avatar: string;
        username: string;
    }
}