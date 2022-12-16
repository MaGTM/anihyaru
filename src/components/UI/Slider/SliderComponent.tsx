import React, {FC, useState} from 'react';
import s from './SliderComponent.module.css'
import ArrowIcon from "../Icons/ArrowIcon";
import {useInterval} from "../../../hooks/useInterval";
import {color, zeroToOne} from "../../../types/types";
import {IArticlePreview} from "../../../models/IArticle";
import bg1 from '../../../assets/images/Chainsaw-Man-Makima-Chainsaw-Man-anime-girls-red-1958923.jpg'
import bg2 from '../../../assets/images/392433-power-chainsaw-man-anime-4k-pc-wallpaper.jpg'
import bg3
    from '../../../assets/images/Chainsaw-Man-Makima-Chainsaw-Man-Samurai-Sword-Chainsaw-Man-Reze-Chainsaw-Man-Santa-Claus-Chainsaw-Man-Quanxi-Chainsaw-Man-manga-artwork-Devil-anime-suits-1979185.jpg'
import {useNavigate} from "react-router-dom";

const ONE_SECOND: number = 1000

interface SliderComponentProps {
    sliderData: IArticlePreview[] | undefined,
    duration: number,
    width?: number,
    height?: number,
    borderRadius?: number,
    fontSize?: number,
    imageBrightness?: zeroToOne,
    svgWidth?: number,
    svgHeight?: number,
    svgColor?: color,
    svgMarginFromBorder?: number,
    textColor?: color,
    progressBarVisible?: boolean,
    progressBarColor?: [color, color],
    progressBarPadding?: [number, number, number, number],

}

let imgArray = [bg1, bg2, bg3, bg1, bg1, bg2, bg3, bg1, bg1, bg2, bg3, bg1]

const SliderComponent: FC<SliderComponentProps> = ({
                                                       sliderData,
                                                       duration,
                                                       width = 1024,
                                                       height = 576,
                                                       borderRadius = 20,
                                                       fontSize = 35,
                                                       imageBrightness = 0.7,
                                                       svgWidth = 38,
                                                       svgHeight = 70,
                                                       svgMarginFromBorder = 30,
                                                       svgColor = '#FFF',
                                                       textColor = '#fff',
                                                       progressBarVisible = true,
                                                       progressBarColor = ['#000', '#fff'],
                                                       progressBarPadding = [0, 30, 20, 30],
                                                   }) => {
    const [sliderPos, setSliderPos] = useState<number>(0)
    const [timeLeft, setTimeLeft] = useInterval(duration, ONE_SECOND)

    const elementsAmount: number = sliderData?.length || 0

    let sliderChangePosHandler = (changeType: string | number): void => { // Функция переключения слайдов
        setTimeLeft(duration) // Обновление таймера
        if (changeType === 'next') { // Переключение слайда вперед
            if (sliderPos < elementsAmount - 1) {  // elementsAmount-1, чтобы картинка не уехала слишком далеко
                setSliderPos(sliderPos + 1)
            } else {
                setSliderPos(0)
            }
        }

        if (changeType === 'prev') { // Переключение слайда назад
            if (sliderPos > 0) {
                setSliderPos(sliderPos - 1)
            } else {
                setSliderPos(elementsAmount - 1)  // elementsAmount-1, чтобы картинка не уехала слишком далеко
            }
        }

        if (typeof (changeType) === "number") { // Переключение слайда по номеру
            setSliderPos(changeType)
        }
    }

    if (timeLeft <= 0) { // Переключение слайда при исходе времени
        setTimeLeft(duration)
        sliderChangePosHandler('next')
    }

    let sliderArray = sliderData?.map((item, index) => { // Отрисовка компонентов слайдера
        return <SliderImageComponent
            key={item.id}
            id={item.id}
            title={item.title}
            img={imgArray[index]}
            width={width}
            fontSize={fontSize}
            imageBrightness={imageBrightness}
            textColor={textColor}
        />
    })

    let progressBarArray = []

    for (let i = 0; i < elementsAmount; i++) { // Отрисовка прогресс баров снизу слайдера
        progressBarArray.push(<ProgressBarItem
                key={i}
                sliderPos={sliderPos}
                duration={duration}
                id={i}
                sliderChangePosHandler={sliderChangePosHandler}
                progressBarColor={progressBarColor}
                elementsAmount={elementsAmount}
            />
        )
    }


    return (
        <div className={s.sliderBlock}
             style={{width: `${width}px`, minHeight: `${height}px`, borderRadius: `${borderRadius}px`}}>
            <div className={s.sliderImagesBlock} style={{right: `${sliderPos * 100}%`}}>
                {sliderArray}
            </div>
            <ArrowIcon
                className={s.prev}
                onClick={() => {
                    sliderChangePosHandler('prev')
                }}
                style={{
                    width: `${svgWidth}px`,
                    height: `${svgHeight}px`,
                    marginLeft: `${svgMarginFromBorder}px`,
                    marginRight: `${svgMarginFromBorder}px`,
                    fill: `${svgColor}`
                }}
            />
            <ArrowIcon
                className={s.next}
                onClick={() => {
                    sliderChangePosHandler('next')
                }}
                style={{
                    width: `${svgWidth}px`,
                    height: `${svgHeight}px`,
                    marginLeft: `${svgMarginFromBorder}px`,
                    marginRight: `${svgMarginFromBorder}px`,
                    fill: `${svgColor}`
                }}
            />
            {progressBarVisible &&
                <div className={s.progressBar}
                     style={{padding: `${progressBarPadding[0]}px ${progressBarPadding[1]}px ${progressBarPadding[2]}px ${progressBarPadding[3]}px`}}
                >
                    {progressBarArray}
                </div>
            }
        </div>
    );
};

interface SliderImageComponentProps {
    id: number | undefined,
    title?: string,
    img: string,
    width: number,
    fontSize: number,
    imageBrightness: zeroToOne,
    textColor: color,
}

const SliderImageComponent: FC<SliderImageComponentProps> = ({
                                                                 id,
                                                                 title,
                                                                 img,
                                                                 width,
                                                                 fontSize,
                                                                 imageBrightness,
                                                                 textColor
                                                             }) => {
    let navigate = useNavigate()
    return (
        <div className={s.sliderImage} onClick={() => navigate(`/news/${id}`)}>
            <h2 style={{fontSize: `${fontSize}px`, color: `${textColor}`}}>{title}</h2>
            <img src={img} alt="SliderImage" style={{width: `${width}px`, filter: `brightness(${imageBrightness})`}} />
        </div>
    )
}

interface ProgressBarItemProps {
    sliderPos: number,
    duration: number,
    id: number,
    sliderChangePosHandler: (id: number) => void,
    progressBarColor: [color, color],
    elementsAmount: number
}

const ProgressBarItem: FC<ProgressBarItemProps> = ({
                                                       sliderPos,
                                                       sliderChangePosHandler,
                                                       id,
                                                       duration,
                                                       progressBarColor,
                                                       elementsAmount
                                                   }) => {
    const WIDTH: number = Math.floor(100 / elementsAmount) - 1
    return (
        <div
            className={s.progressBarItem + ' ' + (sliderPos === id ? s.active : '')}
            onClick={() => {
                sliderChangePosHandler(id)
            }}
            style={{backgroundColor: `${progressBarColor[0]}`, width: `${WIDTH}%`}}
        >
            <div className={s.line}
                 style={{animationDuration: `${duration}s`, backgroundColor: `${progressBarColor[1]}`}}/>
        </div>
    )
}

export default SliderComponent;