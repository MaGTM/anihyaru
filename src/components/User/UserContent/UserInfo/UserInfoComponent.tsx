import React from 'react';
import {useOutletContext} from "react-router-dom";
import s from './UserInfoComponent.module.css'
import {IUser} from "../../../../models/IUser";
import {currentMonthName} from "../../../utils/currentMonthName";

const UserInfoComponent = () => {
    let user = useOutletContext<IUser>()
    let date = new Date()

    function daysInMonth (month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    let daysArray = []
    for(let i = 1; i <= daysInMonth(date.getMonth()+1, date.getFullYear()); i++) {
        let active = false
        for(let k = 0; k < user.dates.length; k++) {
            if(user.dates[k].split('/')[1] === String(date.getMonth()+1)) {
                if(user.dates[k].split('/')[0] === String(i)) {
                    active = true
                }
            }
        }
        daysArray.push(<div className={s.item + ' ' + (active ? s.active : '')} key={i}>{i}</div>)
    }

    return (
        <div className={s.content}>
            <div className={s.settingsBlock}>
                <h1>Настройки</h1>
                <div className={s.inputsBlock}>
                    <div className={s.item}>
                        <label htmlFor="login">Имя пользователя</label>
                        <input type="text" id={"login"} value={user.login} readOnly/>
                    </div>
                    <div className={s.item}>
                        <label htmlFor="email">Email</label>
                        <input type="text" id={"email"} value={user.email} readOnly/>
                    </div>
                    <div className={s.item}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id={"password"} value={user.password} readOnly/>
                    </div>
                </div>
            </div>
            <div className={s.monthCheckBlock}>
                <h3>{currentMonthName(date.getMonth())}</h3>
                <div className={s.days}>
                    {daysArray}
                    <div className={s.info}>
                        <div>
                            <div className={s.item} />
                            <p>- вы не заходили на сайт</p>
                        </div>
                        <div>
                            <div className={s.item + ' ' + s.active} />
                            <p>- вы заходили на сайт</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoComponent;