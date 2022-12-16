import {IAnimeDescription, IAnimePreview} from "../../models/IAnime";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const animeAPI = createApi({
    reducerPath: "animeAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'https://shikimori.one/api'}),
    endpoints: (build) => ({
        fetchAllAnimes: build.query<IAnimePreview[], string>({
            query: (queryParams) => ({
                url: `/animes?${queryParams}`,
            })
        }),

        fetchAnimeById: build.query<IAnimeDescription, number | undefined>({
            query: (id) => ({
                url: `/animes/${id}`,
            })
        }),
    })
})