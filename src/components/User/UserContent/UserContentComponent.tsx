import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import s from './UserContentComponent.module.css'
import UserIcon from "../../UI/Icons/UserIcon";
import MessageIcon from "../../UI/Icons/MessageIcon";
import StarIcon from "../../UI/Icons/StarIcon";
import {Link, useLocation} from "react-router-dom";

interface UserContentComponentProps {
    Outlet: React.ReactNode
}

const UserContentComponent: FC<UserContentComponentProps> = ({Outlet}) => {
    let {pathname} = useLocation()
    let [currentPage, setCurrentPage] = useState(1)

    useLayoutEffect(() => {
        switch (pathname) {
            case '/user':
                setCurrentPage(1)
                break
            case '/user/comments':
                setCurrentPage(2)
                break
        }
    }, [pathname])
    return (
        <div className={s.content}>
            <div className={s.userNav}>
                <Link to={'/user'} className={s.userNavItem + ' ' + (currentPage === 1 && s.active)} onClick={() => setCurrentPage(1)}>
                    <UserIcon />
                </Link>
                <Link to={'/user/comments'} className={s.userNavItem + ' ' + (currentPage === 2 && s.active)} onClick={() => setCurrentPage(2)}>
                    <MessageIcon />
                </Link>
                <Link to={'/user/favourites'} className={s.userNavItem + ' ' + (currentPage === 3 && s.active)} onClick={() => setCurrentPage(3)}>
                    <StarIcon />
                </Link>
                <div id={s.indicator} />
            </div>
            {Outlet}
        </div>
    );
};

export default UserContentComponent;