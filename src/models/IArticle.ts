export interface IArticlePreview {
    id?: number,
    title: string,
    preview: string,
    description: string,
    createdAt: string,
    rating: number,
    likes: number
}

export interface IArticle {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    userId: number
}