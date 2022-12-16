import React, {FC, useEffect, useState} from 'react';
import s from './InputError.module.css'
import InfoIcon from "../Icons/InfoIcon";
import {useViewportWidth} from "../../../hooks/useViewportWidth";

interface InputErrorProps {
    errorMessage: string
}

const InputError: FC<InputErrorProps> = ({errorMessage}) => {
    let [isMouseOver, setIsMouseOver] = useState<boolean>(false)
    let width = useViewportWidth()

    useEffect(() => {
        if(width >= 100 && width <= 960) setIsMouseOver(true)
    }, [width])

    let onHoverSwitcherHandler = () => {
        switch (isMouseOver) {
            case false:
                setIsMouseOver(true)
                break
            case true:
                setIsMouseOver(false)
                break
        }
    }
    return (
        <div className={s.content + ' ' + (isMouseOver && s.active)}>
            <InfoIcon onHover={onHoverSwitcherHandler}/>
            <span>{errorMessage}</span>
        </div>
    );
};

export default InputError;