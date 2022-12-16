import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import {IUserComment} from "../../models/IComment";



let cookies = new Cookies()
export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'https://anihya-production.up.railway.app/api/user'}),
    endpoints: (build) => ({
        registration: build.mutation({
            query: (userData) => ({
                url: '/registration',
                method: 'POST',
                body: userData
            })
        }),
        login: build.mutation({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData
            })
        }),
        check: build.query({
            query: (token) => ({
                url: '/auth',
                headers: {Authorization: `Bearer ${cookies.get('token')}`}
            })
        }),
        getFullInfo: build.query({
            query: (token) => ({
                url: '/getfullinfo',
                headers: {Authorization: `Bearer ${cookies.get('token')}`}
            })
        }),
        changeDescription: build.mutation({
            query: (description) => ({
                url: '/desc',
                method: 'PUT',
                body: description,
                headers: {Authorization: `Bearer ${cookies.get('token')}`},
            })
        }),
        uploadAvatar: build.mutation({
            query: (file) => ({
                url: '/upload',
                method: 'POST',
                body: file,
                headers: {Authorization: `Bearer ${cookies.get('token')}`},
            })
        }),
        getComments: build.query<IUserComment[], null>({
            query: () => ({
                url: '/getcomments',
                headers: {Authorization: `Bearer ${cookies.get('token')}`}
            })
        })
    })
})