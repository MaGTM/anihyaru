import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";

export interface UserState {
    login: string,
    role: string,
    email: string,
    avatar: string,
    isAuth: boolean,
    isLoading: boolean,
}

const initialState = {
    login: '',
    role: '',
    email: '',
    avatar: '',
    isAuth: false,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, payload: PayloadAction<IUser>) => {
            state.login = payload.payload.login
            state.role = payload.payload.role
            state.email = payload.payload.email
            state.avatar = payload.payload.avatar
            state.isAuth = true
        },
        setIsLoading: (state, payload: PayloadAction<boolean>) => {
            state.isLoading = payload.payload
        },
        setUserAvatar: (state, payload: PayloadAction<string>) => {
            state.avatar = payload.payload
        },
        logout: (state) => {
            state.login = ''
            state.role = ''
            state.email = ''
            state.avatar = ''
            state.isAuth = false
        }
    }
})

export const { setAuth, setIsLoading, setUserAvatar, logout } = userSlice.actions

export default userSlice.reducer