import React, {FC, useState} from 'react';
import s from './AnimeListItem.module.css'
import {IAnimePreview} from "../../../models/IAnime";
import AnimeDescriptionComponent from "./AnimeDescriptionComponent/AnimeDescriptionComponent";
import {useViewportWidth} from "../../../hooks/useViewportWidth";
import {useNavigate} from "react-router-dom";

interface AnimeListItemProps extends IAnimePreview {
    isRight: boolean
}

const AnimeListItem: FC<AnimeListItemProps> = ({name, russian, kind, aired_on, image, score, id, isRight}) => {
    let [isMouseOver, setIsMouseOver] = useState<boolean>(false)
    let width = useViewportWidth()
    let navigate = useNavigate()


    return (
        <div className={s.content}
             onMouseEnter={width > 960 ? () => setIsMouseOver(true) : () => {
             }}
             onMouseLeave={width > 960 ? () => setIsMouseOver(false) : () => {
             }}
             onClick={() => navigate(`anime/${id}`)}
        >
            <div className={s.bookmarkBlock}>
                {score}
            </div>
            <img src={`https://shikimori.one${image.preview}`} alt={name}/>
            <div className={s.infoBlock}>
                <h2>{russian ? russian : name}</h2>
                <div>
                    <p>{kind}</p>
                    <p>{aired_on}</p>
                </div>
            </div>
            {isMouseOver && <AnimeDescriptionComponent id={id} isRight={isRight} setIsMouseOver={setIsMouseOver}/>}
        </div>
    );
};

export default AnimeListItem;