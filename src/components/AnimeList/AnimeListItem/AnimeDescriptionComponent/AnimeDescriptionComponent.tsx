import React, {FC} from 'react';
import s from './AnimeDescriptionComponent.module.css'
import {animeAPI} from "../../../../store/services/animeService";
import Loader from "../../../UI/Loader/Loader";
import parse, {domToReact, HTMLReactParserOptions, Element} from 'html-react-parser';
import CrossIcon from "../../../UI/Icons/CrossIcon";
import {episodesReformat} from "../../../utils/episodesReformat";
import {statusReformat} from "../../../utils/statusReformat";

interface AnimeDescriptionComponentProps {
    id: number,
    isRight: boolean,
    setIsMouseOver: React.SetStateAction<any>
}

const AnimeDescriptionComponent: FC<AnimeDescriptionComponentProps> = ({id, setIsMouseOver, isRight}) => {

    let {data, isLoading} = animeAPI.useFetchAnimeByIdQuery(id)

    let studiosString = ''
    let genresString = ''

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

    if (data) {
        let studiosArray = []
        let genresArray = []
        studiosArray = data.studios.map(item => {
            return item.name
        })

        genresArray = data.genres.map(item => {
            return item.russian ? item.russian : item.name
        })

        for (let i = 0; i < studiosArray.length; i++) {
            if (studiosArray.length - 1 !== i) {
                studiosString += `${studiosArray[i]}, `
            } else {
                studiosString += `${studiosArray[i]}`
            }
        }

        for (let i = 0; i < genresArray.length; i++) {
            if (genresArray.length - 1 !== i) {
                genresString += `${genresArray[i]} `
            } else {
                genresString += `${genresArray[i]}`
            }
        }
    }


    let {status, statusClass} = statusReformat(data, [s.released, s.ongoing, s.anons])
    let episodes = episodesReformat(data)

    return (
        <div className={s.content} data-fourth={isRight}>
            <div className={s.descriptionBlock}>
                {isLoading && <Loader blockAmount={4} loaderClassName={s.loader}/>}
                {data &&
                    <>
                        <div className={s.title}>
                            <h3>{data.russian ? data.russian : data.name}</h3>
                            <CrossIcon onClick={(e: React.MouseEvent) => {e.stopPropagation(); setIsMouseOver(false)}}/>
                        </div>
                        <div id={s.description}>{parse(data.description_html, options)}</div>
                        <div className={s.topDiv}>
                            <p>Тип: <span>{data.kind}</span></p>
                            <p><span>{data.aired_on ? data.aired_on.split('-')[0] : ''}</span></p>
                            <span className={s.status + ' ' + statusClass}>{status}</span>
                        </div>
                        <div className={s.botDiv}>
                            {data.kind !== 'movie' && <p>Эпизоды: {episodes}</p>}
                            <p>Студия: {studiosString}</p>
                        </div>
                        <p>Жанры: <span id={s.genres}>{genresString}</span></p>
                    </>
                }
            </div>
        </div>
    );
};

export default AnimeDescriptionComponent;