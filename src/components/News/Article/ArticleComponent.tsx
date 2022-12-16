import React, {useState} from 'react';
import s from './ArticleComponent.module.css'
import {Link, useParams} from "react-router-dom";
import {articleAPI} from "../../../store/services/articleService";
import StarIcon from "../../UI/Icons/StarIcon";
import parse from "html-react-parser";
import img from "../../../assets/images/userAvatar160px.png"
import noImage from "../../../assets/images/No Image.png"
import ArticleLoader from "./Loader/ArticleLoader";
import SpinnerLoader from "../../UI/SpinnerLoader/SpinnerLoader";
import AuthNotifyComponent from "../../Auth/AuthNoitfy/AuthNotifyComponent";

const ArticleComponent = () => {
    let {id} = useParams()
    let {data, isLoading} = articleAPI.useFetchArticleByIdQuery(id)
    let {data: latestNews, isLoading: latestNewsLoading} = articleAPI.useFetchAllArticlesQuery('order=updatedAt')
    let {data: comments, isLoading: commentsLoading, refetch} = articleAPI.useGetArticleCommentsQuery(id)
    let [addComment, {
        data: commentResponse,
        isLoading: addingCommentLoading,
        isError
    }] = articleAPI.useCreateArticleCommentMutation()
    let [comment, setComment] = useState('')
    let errorMessage


    let latestNewsArray = latestNews?.map((item) => {
        return (
            <Link to={`/news/${item.id}`} data-content={item.title}>
                <img src={noImage} alt="preview"/>
            </Link>
        )
    })


    let commentsArray = comments?.map((item) => {
        return (
            <div className={s.commentItem} key={item.id}>
                <div className={s.user}>
                    <span>{item.user.userName.split('')[0]}</span>
                </div>
                <div className={s.commentContent}>
                    <h4>{item.user.userName}</h4>
                    <p>
                        {item.content}
                    </p>
                </div>
            </div>
        )
    })

    let addCommentHandler = () => {
        addComment({articleId: Number(id), content: comment}).then((res) => {
            refetch()
        }).finally(() => {
                setComment('')
            })
    }

    if (isLoading || latestNewsLoading) return <ArticleLoader/>

    return (
        <div className={s.content}>
            <div className={s.headerInfo}>
                <div className={s.navigation}>
                    <Link to={'/'}>Главная</Link>{'>>'}
                    <Link to={'/news'}>Новости</Link>{'>>'}
                    <Link to={'#'}>{data?.title}</Link>
                </div>
                <h1>{data?.title}</h1>
                <div className={s.toFavouriteBtn}>

                </div>
            </div>
            <div className={s.articleContent}>
                {data?.content && parse(data.content)}
            </div>
            <div className={s.latestNews}>
                {latestNewsArray}
            </div>
            <div className={s.commentInputBlock}>
                <h4>Оставьте комментарий</h4>
                <div className={s.commentInput}>
                    <textarea placeholder={'Крутая статья'} value={comment}
                              onChange={(e) => setComment(e.target.value)}/>
                    <button disabled={!comment || addingCommentLoading}
                            onClick={addCommentHandler}>{addingCommentLoading ?
                        <SpinnerLoader/> : 'Оставить комментарий'}</button>
                </div>
            </div>
            <div className={s.commentsBlock}>
                {comments?.length ? commentsArray : <div className={s.empty}>Пусто</div>}
            </div>
            <AuthNotifyComponent isError={isError}/>
        </div>
    );
};

export default ArticleComponent;