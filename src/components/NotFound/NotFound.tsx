import React from 'react';
import notfound from '../../assets/images/404.png'
import {Link} from "react-router-dom";
import s from "./NotFound.module.css"

const NotFound = () => {
    return (
        <div className={s.content}>
            <div className={s.notfound}>
                <img src={notfound} alt="page not found"/>
                <p>Страница не<br/> найдена</p>
            </div>
            <Link to={'/'}>На главную</Link>
        </div>
    );
};

export default NotFound;