import React, {useEffect} from 'react';
import s from './UserCommentsComponent.module.css'
import EmptyContent from "../../../UI/EmptyContent/EmptyContent";
import {userAPI} from "../../../../store/services/userService";
import noImage from "../../../../assets/images/No Image.png"
import {Link} from "react-router-dom";
import Loader from "../../../UI/Loader/Loader";

const UserCommentsComponent = () => {
    let {data, isLoading, refetch} = userAPI.useGetCommentsQuery(null)
    useEffect(() => {
        refetch()
    }, [])
    let commentsArray = data?.map(item => {
        return (
            <Link className={s.commentItem} to={`/news/${item.article.articleId}`}>
                <img src={noImage} alt=""/>
                <div className={s.commentContent}>
                    <h2>{item.article.title}</h2>
                    <p>{item.content}</p>
                </div>
                <span>{item.createdAt.split('T')[0]}</span>
            </Link>
        )
    })
    return (
        <div className={s.content}>
            <h1>Последние комментарии</h1>
            <div className={s.commentsBlock}>
                {isLoading ? <Loader blockAmount={6} loaderClassName={s.loader}/> : commentsArray}
                {!isLoading && (data?.length ? '' : <EmptyContent />)}
            </div>
        </div>
    );
};

export default UserCommentsComponent;