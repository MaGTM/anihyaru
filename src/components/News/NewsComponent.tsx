import React, {useState} from 'react';
import s from './NewsComponent.module.css'
import SortComponent from "./Sort/SortComponent";
import {articleAPI} from "../../store/services/articleService";
import ArticlePreviewComponent from "./ArticlePreview/ArticlePreviewComponent";

const NewsComponent = () => {
    let sortOptions = [
        {id: 0, title: 'Сначала новые', value: 'updatedAt'},
        {id: 1, title: 'Сначала старые', value: 'updatedAtRev'},
        {id: 2, title: 'Сначала популярные', value: 'popular'},
        {id: 3, title: 'Сначала непопулярные', value: 'popularRev'},
    ]
    let [currentSort, setCurrentSort] = useState(0)

    let {data, isLoading} = articleAPI.useFetchAllArticlesQuery(`order=${sortOptions[currentSort].value}`)

    let articlesArray = data?.map((item) => {
        return <ArticlePreviewComponent key={item.id} id={item.id} description={item.description} preview={item.preview} title={item.title}
                                        createdAt={item.createdAt} rating={item.rating} likes={item.likes}/>
    })
    return (
        <div className={s.content}>
            <h1>Новости</h1>
            <SortComponent currentSort={currentSort} sortOptions={sortOptions} setCurrentSort={setCurrentSort}/>
            <div className={s.newsBlock}>
                {articlesArray}
            </div>
        </div>
    );
};

export default NewsComponent;