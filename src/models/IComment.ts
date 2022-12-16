export interface IComment {
    id: number,
    content: string,
    likes: number,
    dislikes: number,
    user: {
        userName: string
    }
}

export interface IUserComment {
    id: number,
    content: string,
    createdAt: string,
    article: {
        articleId: string,
        title: string
    }
}