import React from 'react';
import {animeAPI} from "../../../store/services/animeService";
import {useParams} from "react-router-dom";
import s from './AnimeComponent.module.css'
import {episodesReformat} from "../../utils/episodesReformat";
import {statusReformat} from "../../utils/statusReformat";
import parse, {domToReact, Element, HTMLReactParserOptions} from "html-react-parser";

const AnimeComponent = () => {
    let {id} = useParams()
    let {data, isLoading} = animeAPI.useFetchAnimeByIdQuery(Number(id))

    let {status, statusClass} = statusReformat(data, [s.released, s.ongoing, s.anons])
    let episodes = episodesReformat(data)

    let genresString = ''

    if(data) {
        let genresArray = []
        genresArray = data.genres.map(item => {
            return item.russian ? item.russian : item.name
        })

        for (let i = 0; i < genresArray.length; i++) {
            if (genresArray.length - 1 !== i) {
                genresString += `${genresArray[i]}, `
            } else {
                genresString += `${genresArray[i]}`
            }
        }
    }

    const options: HTMLReactParserOptions = {
        replace:  domNode => {
            const domElement: Element = domNode as Element;
            if (domElement) {
                if (domElement.name === 'a') {
                    return <span>{domToReact(domElement.children)}</span>;
                }
            }
        }
    };

    return (
        <div className={s.content}>
            <img src={`https://shikimori.one${data?.image.original}`} alt=""/>
            <div className={s.mainContent}>
                <h1>{data?.russian ? data?.russian : data?.name}</h1>
                <div className={s.animeInfo}>
                    <p>{`Тип: `}<span>{data?.kind}</span></p>
                    <p>{`Эпизоды: ${episodes}`}</p>
                    <p>{`Статус: `}{<span className={s.status + ' ' + statusClass}>{status}</span>}</p>
                    <p>{`Жанры: `}<span>{genresString}</span></p>
                </div>
                <div className={s.animeDescription}>
                    <h2>Описание</h2>
                    {data && <p>{parse(data.description_html, options)}</p>}
                </div>
            </div>
        </div>
    );
};

export default AnimeComponent;