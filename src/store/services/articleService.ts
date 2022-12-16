import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IArticle, IArticlePreview} from "../../models/IArticle";
import {IComment} from "../../models/IComment";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export const articleAPI = createApi({
    reducerPath: "articleAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'https://anihya-production.up.railway.app/api/article'}),
    endpoints: (build) => ({
        fetchAllArticles: build.query<IArticlePreview[], string>({
            query: (queryParams) => ({
                url: `/articles?${queryParams}`,
            })
        }),
        fetchArticleById: build.query<IArticle, string | undefined>({
            query: (id) => ({
                url: `/articles/${id}`
            })
        }),
        getArticleComments: build.query<IComment[], string | undefined>({
            query: (id) => ({
                url: `/comments?id=${id}`
            })
        }),
        createArticleComment: build.mutation({
            query: (data: {articleId: number, content: string}) => ({
                url: '/addcomment',
                method: 'POST',
                body: data,
                headers: {Authorization: `Bearer ${cookies.get('token')}`},
            })
        })
    })
})