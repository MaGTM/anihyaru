import React from 'react';
import s from './UserComponent.module.css'
import UserDescriptionComponent from "./UserDescription/UserDescriptionComponent";
import UserContentComponent from "./UserContent/UserContentComponent";
import UserStatsComponent from "./UserStats/UserStatsComponent";
import {userAPI} from "../../store/services/userService";
import Cookies from "universal-cookie";
import {Outlet} from "react-router-dom";
import Loader from "../UI/Loader/Loader";

const UserComponent = () => {
    let cookies = new Cookies()
    let {data, isLoading} = userAPI.useGetFullInfoQuery(cookies.get('token'))
    if(isLoading) return <Loader blockAmount={3} loaderClassName={s.loader} />
    return (
        <div className={s.content}>
            <UserDescriptionComponent user={data}/>
            <UserContentComponent Outlet={<Outlet context={data}/>}/>
            <UserStatsComponent user={data}/>
        </div>
    );
};

export default UserComponent;