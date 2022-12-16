import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {animeAPI} from "./services/animeService";
import {userAPI} from "./services/userService";
import {articleAPI} from "./services/articleService";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    [animeAPI.reducerPath]: animeAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [articleAPI.reducerPath]: articleAPI.reducer,
    user: userReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(animeAPI.middleware, userAPI.middleware, articleAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']