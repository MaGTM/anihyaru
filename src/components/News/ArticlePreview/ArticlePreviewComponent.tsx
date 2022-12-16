import React, {FC} from 'react';
import EyeIcon from "../../UI/Icons/EyeIcon";
import CalendarIcon from "../../UI/Icons/CalendarIcon";
import {Link} from "react-router-dom";
import s from './ArticlePreviewComponent.module.css'
import {IArticlePreview} from "../../../models/IArticle";
import {changeDateToWords} from "../../utils/changeDateToWords";
import noImage from '../../../assets/images/No Image.png'
import LikeIcon from "../../UI/Icons/LikeIcon";

const ArticlePreviewComponent: FC<IArticlePreview> = ({
                                                          id,
                                                          preview,
                                                          title,
                                                          description,
                                                          createdAt,
                                                          rating,
                                                          likes
                                                      }) => {
    let date = changeDateToWords(createdAt)
    return (
        <Link to={`/news/${id}`} className={s.article}>
            <img src={noImage} alt="preview"/>
            <h2>{title}</h2>
            <p className={s.description}>{description}</p>
            <div className={s.articleStats}>
                <div>
                    <CalendarIcon/>
                    <p>{date}</p>
                </div>
                <div>
                    <LikeIcon/>
                    <p>{likes}</p>
                </div>
            </div>
            <div className={s.bookmarkBlock}>{rating}</div>
        </Link>
    );
};

export default ArticlePreviewComponent;