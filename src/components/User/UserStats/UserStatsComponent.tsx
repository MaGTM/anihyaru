import React, {FC} from 'react';
import s from './UserStatsComponent.module.css'
import {IUserComponent} from "../../../models/IUser";
import MessageIcon from "../../UI/Icons/MessageIcon";
import StarIcon from "../../UI/Icons/StarIcon";
import LikeIcon from "../../UI/Icons/LikeIcon";


const UserStatsComponent: FC<IUserComponent> = ({user}) => {
    return (
        <div className={s.content}>
            <div className={s.item}>
                <MessageIcon />
                <p>0</p>
            </div>
            <div className={s.item}>
                <StarIcon />
                <p>{user.favourites ? user.favourites.length : 0}</p>
            </div>
            <div className={s.item}>
                <LikeIcon />
                <p>{user.likes ? user.likes.length : 0}</p>
            </div>
        </div>
    );
};

export default UserStatsComponent;