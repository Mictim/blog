export type Post = {
    id: string;
    title: string;
    comments?: Comment[];
};

export type Comment = {
    id: string;
    content: string;
    postId: string;
    status: string;
};