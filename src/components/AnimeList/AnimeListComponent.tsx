import React, {useEffect, useLayoutEffect, useState} from 'react';
import s from './AnimeListComponent.module.css'
import {animeAPI} from "../../store/services/animeService";
import AnimeListItem from "./AnimeListItem/AnimeListItem";
import SortComponent from "./Sort/SortComponent";
import Loader from "../UI/Loader/Loader";
import Error from "../UI/Error/Error";
import {IAnimePreview} from "../../models/IAnime";
import {useInView} from "react-intersection-observer";



const AnimeListComponent = () => {
    let [params, setParams] = useState<Record<string, number | string>>({limit: 12, order: 'ranked', page: 1})
    let [animes, setAnimes] = useState<IAnimePreview[]>([])
    let [isLoading, setIsLoading] = useState(false)
    let [isMax, setIsMax] = useState(false)
    const { ref, inView } = useInView({
        threshold: 0,
    });

    let queryString: string = ''

    for (let key in params) {
        queryString += `${key}=${params[key]}&`
    }

    let [fetchAnimes, result] = animeAPI.useLazyFetchAllAnimesQuery()
    useEffect(()=> {
        setIsLoading(true)
        fetchAnimes(queryString)
            .then((result) => {
                if(result.data) {
                    setAnimes([...result.data])
                    setParams({...params, page: Number(params.page) + 1})
                }
            })
            .finally(() => setIsLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useLayoutEffect(() => {
        if(inView && !isMax) {
            setIsLoading(true)
            fetchAnimes(queryString)
                .then((result) => {
                    if(result.data) {
                        if(result.data.length === 0) return setIsMax(true)
                        setAnimes([...animes, ...result.data])
                        setParams({...params, page: Number(params.page) + 1})
                    }
                })
                .finally(() => setIsLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView])

    let changeSortType = (newParams: Record<string, number | string>): void => {
        window.scrollTo(0, 0)
        setIsLoading(true)
        let localQuery = ''
        for (let key in newParams) {
            localQuery += `${key}=${newParams[key]}&`
        }
        fetchAnimes(localQuery)
            .then((result) => {
                if(result.data) {
                    setAnimes([...result.data])
                    setParams({...newParams, page: 2})
                    setIsMax(false)
                }
            })
            .finally(() => setIsLoading(false))
    }

    let animesArray = animes && animes.map((item, index) => {
        return <AnimeListItem
            key={item.id}
            id={item.id}
            name={item.name}
            russian={item.russian}
            kind={item.kind}
            aired_on={item.aired_on ? item.aired_on.split('-')[0] : ''}
            image={item.image}
            score={item.score}
            isRight={((index+1) % 4) === 3 || ((index+1) % 4) === 0 || (index+1) === 3}
        />
    })
    return (
        <div className={s.content}>
            <h1>Аниме</h1>
            <div className={s.mainContent} >
                <div className={s.animeListBlock}>
                    {animesArray}
                    {isLoading && <Loader blockAmount={12} loaderClassName={s.loader}/>}
                    {result.status === 'rejected' && <Error />}
                </div>
                <SortComponent changeParams={setParams} queryParams={params} changeSortType={changeSortType}/>
            </div>
            <div id={s.observingBlock} ref={ref} style={{display: result.status === 'rejected' && isLoading && !isMax ? 'none': ''}}/>
        </div>
    );
};

export default AnimeListComponent;