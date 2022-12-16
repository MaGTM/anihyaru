import React from 'react';
import s from './HomeComponents.module.css'
import SliderComponent from "../UI/Slider/SliderComponent";
import {Link} from "react-router-dom";
import PopularOngoingsComponent from "./PopularOngoings/PopularOngoingsComponent";
import {useViewportWidth} from "../../hooks/useViewportWidth";
import {articleAPI} from "../../store/services/articleService";

const HomeComponent = () => {

    let width = useViewportWidth()
    let {data, isLoading, isError} = articleAPI.useFetchAllArticlesQuery('order=updatedAt')

    return (
        <div className={s.content}>
            <div className={s.blockContent + ' ' + s.top}>
                <SliderComponent
                    sliderData={data}
                    duration={10}
                    width={width <= 960 ? (width-20) : 928}
                    height={width <= 960 ? (((width * 9) / 16) - 20) : 522}
                    progressBarColor={['var(--accent--opacity)', 'var(--accent)']}
                    svgColor={'var(--accent)'}
                    textColor={'var(--neutral--txt)'}
                    fontSize={width <= 960 ? 16 : 35}
                    svgWidth={width <= 960 ? 20 : 38}
                    svgHeight={width <= 960 ? 29 : 70}
                />
                <PopularOngoingsComponent />
            </div>
        </div>
    );
};

export default HomeComponent;