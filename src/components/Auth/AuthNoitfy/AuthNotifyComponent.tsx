import React, {FC, useEffect, useState} from 'react';
import s from './AuthNotifyComponent.module.css'
import {Link} from "react-router-dom";
import CrossIcon from "../../UI/Icons/CrossIcon";

interface AuthNotifyComponentProps {
    isError: boolean
}

const AuthNotifyComponent: FC<AuthNotifyComponentProps> = ({isError}) => {
    let [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        setIsOpen(isError)
        let timer = setTimeout(() => {
            setIsOpen(false)
        }, 8000)
        return function () {
            clearTimeout(timer)
        }
    }, [isError])
    return (
        <div className={s.content} style={{display: isOpen ? 'flex' : 'none'}}>
            <h4>Для этого действия необходима авторизация</h4>
            <Link to={'/login'}>Авторизация</Link>
            <CrossIcon onClick={() => {setIsOpen(false)}}/>
        </div>
    );
};

export default AuthNotifyComponent;