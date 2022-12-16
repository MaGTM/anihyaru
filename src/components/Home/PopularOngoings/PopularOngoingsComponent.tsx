import React, {useEffect, useState} from 'react';
import s from './PopularOngoingsComponent.module.css'
import SpinnerLoader from "../../UI/SpinnerLoader/SpinnerLoader";
import {animeAPI} from "../../../store/services/animeService";
import {IAnimePreview} from "../../../models/IAnime";
import {useInView} from "react-intersection-observer";
import {Link} from "react-router-dom";

const PopularOngoingsComponent = () => {

    let [fetchAnimes] = animeAPI.useLazyFetchAllAnimesQuery()
    let [animes, setAnimes] = useState<IAnimePreview[]>([])
    let [currentPage, setCurrentPage] = useState(1)
    let [isPopularLoading, setIsPopularLoading] = useState(false)

    const { ref, inView } = useInView({
        threshold: 0,
    });

    let popularOngoingsArray = animes.map((item) => {
        return (
            <Link to={'/'} className={s.item} key={item.id}>
                <div className={s.bookmarkBlock}>
                    {item.score}
                </div>
                <img src={`https://shikimori.one${item.image.preview}`} alt={'preview'} width={64.5} height={90}/>
                <p>{item.russian ? item.russian : item.name}</p>
            </Link>
        )
    })

    useEffect(() => {
        setIsPopularLoading(true)
        fetchAnimes(`limit=7&order=ranked&status=ongoing&page=${currentPage}`)
            .then((res) => {
                if(res.data) {
                    setAnimes([...animes, ...res.data])
                }
                setCurrentPage(currentPage+1)
            })
            .finally(() => {
                setIsPopularLoading(false)
            })
    }, [inView])

    return (
        <div className={s.popularOngoingsBlock}>
            <h2>Популярные онгоинги</h2>
            <div className={s.popularOngoings}>
                {popularOngoingsArray}
                <div>
                    {isPopularLoading ? <SpinnerLoader /> : <div id={s.observingBlock} ref={ref}/>}
                </div>
            </div>
        </div>
    );
};

export default PopularOngoingsComponent;