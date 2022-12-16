import React, {useEffect, useState} from 'react';
import s from './SidebarComponent.module.css'
import logo from '../../assets/images/anihya(icon).svg'
import logoDark from '../../assets/images/anihya(icon dark).png'
import ArrowIcon from '../UI/Icons/ArrowIcon';
import HomeIcon from '../UI/Icons/HomeIcon';
import NewsIcon from '../UI/Icons/NewsIcon';
import AnimeIcon from '../UI/Icons/AnimeIcon';
import LightThemeIcon from '../UI/Icons/LightThemeIcon';
import DarkThemeIcon from '../UI/Icons/DarkThemeIcon';
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import {useAppSelector} from "../../hooks/redux";
import LoginIcon from "../UI/Icons/LoginIcon";
import Cookies from "universal-cookie";
import {changeDocumentName} from "../utils/changeDocumentName";
import {useViewportWidth} from "../../hooks/useViewportWidth";

const SidebarComponent = () => {
    let cookies = new Cookies()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [switcher, setSwitcher] = useState<string>(cookies.get('themeColor') ? cookies.get('themeColor') : 'light')
    let user = useAppSelector(state => state.user)
    let navigate = useNavigate()
    let location = useLocation()
    let width = useViewportWidth()


    let openHandler = (): void => {
        switch (isOpen) {
            case false:
                setIsOpen(true)
                document.body.style.top = `-${window.scrollY}px`;
                document.body.style.position = 'fixed';
                break
            case true:
                setIsOpen(false)
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
                break
        }
    }

    let closeHandler = (): void => {
        setIsOpen(false)
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        document.documentElement.setAttribute('color-scheme', switcher)
    }, [switcher])

    useEffect(() => {
        changeDocumentName(location.pathname)
    }, [location])

    let switchHandler = (): void => {
        switch (switcher) {
            case 'light':
                setSwitcher('dark')
                cookies.set('themeColor', 'dark')
                break
            case 'dark':
                setSwitcher('light')
                cookies.set('themeColor', 'light')
                break
        }
    }

    let roleTranslate = ''
    switch (user.role) {
        case 'USER':
            roleTranslate = 'Пользователь'
            break
        case 'ADMIN':
            roleTranslate = 'Администратор'
            break
        case 'MODERATOR':
            roleTranslate = 'Редактор'
            break
    }

    let userBlock = () => {
        if (user.isAuth) {
            return (
                <>
                    {user.avatar ? <img src={user.avatar} alt=""/> :
                        <span className={s.noAvatar}>{user.login.split('')[0]}</span>}
                    <div className={s.userName}>
                        <h4>{user.login}</h4>
                        <p>{roleTranslate}</p>
                    </div>
                </>
            )
        }

        return (
            <>
                <LoginIcon/>
                <div className={s.login} onClick={(e) => {
                    closeHandler()
                }}>
                    <Link to={'/login'} onClick={(e) => {
                        e.stopPropagation()
                        closeHandler()
                    }}>Вход</Link>
                    <span>|</span>
                    <Link to={'/registration'} onClick={(e) => {
                        e.stopPropagation()
                        closeHandler()
                    }}>Регистрация</Link>
                </div>
            </>
        )
    }

    if (width >= 100 && width <= 960) {
        return (
            <>
                <div className={s.content + ' ' + (isOpen ? s.show : '')} style={{top: '0px'}}>
                    <div className={s.userBlock} onClick={user.isAuth ? () => {
                        navigate('/user')
                        closeHandler()
                    } : () => {
                        navigate('/registration')
                        closeHandler()
                    }}>
                        {userBlock()}
                    </div>
                    <div className={s.logoBlock} onClick={closeHandler}>
                        <Link to={'/'}>
                            <img src={switcher === 'light' ? logo : logoDark} alt=""/>
                        </Link>
                    </div>
                    <div className={s.burger} onClick={openHandler}>
                        <span/>
                    </div>
                    <div className={s.menuBlock}>
                        <div className={s.menuItem} onClick={closeHandler}>
                            <NavLink to={'/'} end className={({isActive}) => isActive ? s.active : undefined}>
                                <HomeIcon/>
                                <h3>Главная</h3>
                            </NavLink>
                        </div>
                        <div className={s.menuItem} onClick={closeHandler}>
                            <NavLink to={'news'} className={({isActive}) => isActive ? s.active : undefined}>
                                <NewsIcon/>
                                <h3>Новости</h3>
                            </NavLink>
                        </div>
                        <div className={s.menuItem} onClick={closeHandler}>
                            <NavLink to={'animelist'} className={({isActive}) => isActive ? s.active : undefined}>
                                <AnimeIcon/>
                                <h3>Аниме</h3>
                            </NavLink>
                        </div>
                    </div>
                    <div className={s.changeThemeBlock}>
                        <div className={s.changeThemeAdditionalBlock + ' ' + (switcher === 'dark' ? s.change : '')}>
                            <div className={s.side} onClick={switchHandler}>
                                <LightThemeIcon/>
                                <DarkThemeIcon/>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal zIndex={isOpen ? 50 : -1} isActive={isOpen} closeFun={openHandler}/>
            </>
        )
    }

    return (
        <>
            <div className={s.content + ' ' + (isOpen ? s.show : '')} style={{top: '0px'}}>
                <div className={s.upperBlock}>
                    <div className={s.userBlock} onClick={user.isAuth ? () => {
                        navigate('/user')
                        closeHandler()
                    } : () => {
                        navigate('/registration')
                        closeHandler()
                    }}>
                        {userBlock()}
                    </div>
                    <div className={s.bookmarkBlock} onClick={openHandler}>
                        <ArrowIcon/>
                    </div>
                    <div className={s.menuBlock}>
                        <div className={s.menuItem} onClick={closeHandler}>
                            <NavLink to={'/'} end className={({isActive}) => isActive ? s.active : undefined}>
                                <HomeIcon/>
                                <h3>Главная</h3>
                            </NavLink>
                        </div>
                        <div className={s.menuItem} onClick={closeHandler}>
                            <NavLink to={'news'} className={({isActive}) => isActive ? s.active : undefined}>
                                <NewsIcon/>
                                <h3>Новости</h3>
                            </NavLink>
                        </div>
                        <div className={s.menuItem} onClick={closeHandler}>
                            <NavLink to={'animelist'} className={({isActive}) => isActive ? s.active : undefined}>
                                <AnimeIcon/>
                                <h3>Аниме</h3>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className={s.bottomBlock}>
                    <div className={s.changeThemeBlock}>
                        <div className={s.changeThemeAdditionalBlock + ' ' + (switcher === 'dark' && s.change)}>
                            <div className={s.right + ' ' + s.side} onClick={switchHandler}>
                                <LightThemeIcon/>
                                <DarkThemeIcon/>
                            </div>
                            <label className={s.checkbox}>
                                <input type="checkbox" className={s.checkboxInput} value={switcher}
                                       onChange={switchHandler}/>
                                <div className={s.checkboxDiv + ' ' + (switcher === 'light' ? s.light : s.dark)}></div>
                            </label>
                            <div className={s.left + ' ' + s.side} onClick={switchHandler}>
                                <LightThemeIcon/>
                                <DarkThemeIcon/>
                            </div>
                        </div>
                    </div>
                    <div className={s.logoBlock} onClick={closeHandler}>
                        <Link to={'/'}>
                            <img src={switcher === 'light' ? logo : logoDark} alt=""/>
                            <h1>ANIHYA</h1>
                        </Link>
                    </div>
                </div>
                <div className={s.burger}/>
            </div>
            <Modal zIndex={isOpen ? 50 : -1} isActive={isOpen} closeFun={openHandler}/>
        </>
    );
};

export default SidebarComponent;