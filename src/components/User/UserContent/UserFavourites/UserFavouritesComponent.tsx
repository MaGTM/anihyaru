import React from 'react';
import s from './UserFavourites.module.css'
import EmptyContent from "../../../UI/EmptyContent/EmptyContent";

const UserFavouritesComponent = () => {
    return (
        <div className={s.content}>
            <h1>Избранное</h1>
            <div className={s.commentsBlock}>
                <EmptyContent />
            </div>
        </div>
    );
};

export default UserFavouritesComponent;