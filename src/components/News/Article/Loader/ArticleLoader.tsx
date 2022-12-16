import React from 'react';
import s from './ArticleLoader.module.css'
import StarIcon from "../../../UI/Icons/StarIcon";

const ArticleLoader = () => {
    return (
        <div className={s.content}>
            <div className={s.headerInfo}>
                <div className={s.navigation}>

                </div>
                <h1></h1>
                <div className={s.toFavouriteBtn}>
                    <StarIcon/>
                </div>
            </div>
            <div className={s.articleContent}>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>
                <div className={s.skeletonText}/>

            </div>
            <div className={s.latestNews}>
                <div />
                <div />
                <div />
                <div />
            </div>
            <div className={s.commentInputBlock}>
                <div className={s.skeletonText}/>
                <div className={s.commentInput}>

                </div>
            </div>
            <div className={s.commentsBlock}>
                <div className={s.commentItem} />
                <div className={s.commentItem} />
                <div className={s.commentItem} />
            </div>
        </div>
    );
};

export default ArticleLoader;