export interface IUser {
    id: number,
    email: string,
    login: string,
    password: '********',
    description: string,
    role: string,
    avatar: string,
    dates: string[],
    likes: number[],
    favourites: number[],
}

export interface IUserRegistration {
    email: string,
    login: string,
    password: string
}

export interface IUserRegistrationResponse {
    token: string
}

export interface IUserComponent {
    user: {
        id: number,
        email: string,
        login: string,
        password: '********',
        description: string,
        role: string,
        avatar: string,
        dates: string[],
        likes: number[],
        favourites: number[],
    }
}