import React, {useEffect} from 'react';
import './App.css';
import SidebarComponent from "./components/Sidebar/SidebarComponent";
import LoginComponent from "./components/Auth/Login/LoginComponent";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";
import AnimeListComponent from "./components/AnimeList/AnimeListComponent";
import RegisterComponent from "./components/Auth/Register/RegisterComponent";
import {userAPI} from "./store/services/userService";
import Cookies from "universal-cookie";
import {useAppDispatch} from "./hooks/redux";
import {setAuth, setIsLoading} from "./store/reducers/userReducer";
import jwtDecode from "jwt-decode";
import UserComponent from "./components/User/UserComponent";
import WithAuth from "./components/HOC/WithAuth";
import WithNoAuth from "./components/HOC/WithNoAuth";
import UserInfoComponent from "./components/User/UserContent/UserInfo/UserInfoComponent";
import UserCommentsComponent from "./components/User/UserContent/UserComments/UserCommentsComponent";
import NewsComponent from "./components/News/NewsComponent";
import ArticleComponent from "./components/News/Article/ArticleComponent";
import SpinnerLoader from "./components/UI/SpinnerLoader/SpinnerLoader";
import UserFavouritesComponent from "./components/User/UserContent/UserFavourites/UserFavouritesComponent";
import NotFound from "./components/NotFound/NotFound";
import AnimeComponent from "./components/AnimeList/Anime/AnimeComponent";


function App() {
    let cookies = new Cookies()
    let {data, isLoading, isError} = userAPI.useCheckQuery(cookies.get('token'))
    let dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setIsLoading(isLoading))
        if(data && !isError) {
            dispatch(setAuth(jwtDecode(data.token)))
            cookies.set('token', data.token, {maxAge: 604800})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    if(isError) {
        cookies.remove('token')
    }

    if(isLoading) {
        return(
            <div className='appLoader'>
                <SpinnerLoader />
            </div>
        )
    }
    return (
        <div className="App">
            <SidebarComponent />

            <div className="MainContent">
                <Routes>
                    <Route index element={<HomeComponent />}/>
                    <Route path={'/animelist'} >
                        <Route index element={<AnimeListComponent />}/>
                        <Route path={'anime/:id'} element={<AnimeComponent />}/>
                    </Route>
                    <Route path={'/news'} >
                        <Route index element={<NewsComponent />}/>
                        <Route path={':id'} element={<ArticleComponent />}/>
                    </Route>
                    <Route element={<WithAuth />}>
                        <Route path={'/user'} element={<UserComponent />} >
                            <Route index element={<UserInfoComponent />} />
                            <Route path={'/user/comments'} element={<UserCommentsComponent />} />
                            <Route path={'/user/favourites'} element={<UserFavouritesComponent />} />
                        </Route>
                    </Route>
                    <Route element={<WithNoAuth />}>
                        <Route path={'/registration'} element={<RegisterComponent />}/>
                        <Route path={'/login'} element={<LoginComponent />}/>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
