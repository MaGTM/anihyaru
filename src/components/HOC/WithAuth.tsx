import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {Navigate, Outlet} from "react-router-dom";



const WithAuth = () => {
    let isAuth = useAppSelector(state => state.user.isAuth)
    let isLoading = useAppSelector(state => state.user.isLoading)
    if(!isLoading) {
        if(!isAuth) return <Navigate to={'/login'}/>
    }
    return <Outlet />
};

export default WithAuth;