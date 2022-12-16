import React, {useState} from 'react';
import s from "./LoginComponent.module.css"
import InputWithLabelToTop from "../../UI/InputWithLabelToTop/InputWithLabelToTop";
import {inputWithLabelToTopInterface} from "../../../models/IInputWithLabelToTopInterface";
import {Link, useNavigate} from "react-router-dom";
import {userAPI} from "../../../store/services/userService";
import {setAuth} from "../../../store/reducers/userReducer";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import {useAppDispatch} from "../../../hooks/redux";
import ButtonLoader from "../../UI/ButtonLoader/ButtonLoader";

const LoginComponent = () => {
    let [inputs, setInputs] = useState<inputWithLabelToTopInterface[]>([
        {
            id: 1,
            name: 'emailOrLogin',
            text: 'Email/Имя пользователя',
            type: 'text',
            value: '',
            errorStatus: true,
            validationTypes: ["required"]
        },
        {
            id: 2,
            name: 'password',
            text: 'Пароль',
            type: 'password',
            value: '',
            errorStatus: true,
            validationTypes: ["required"]
        },
    ])

    let [loginUser, {isLoading, data, isError, isSuccess, error}] = userAPI.useLoginMutation()
    let cookies = new Cookies
    let dispatch = useAppDispatch()
    let navigate = useNavigate()

    let disabled = inputs.some((item) => {
        return item.errorStatus
    })

    let errorMsg: string = ''
    if(error) {
        if('data' in error) {
            errorMsg = JSON.stringify(error.data).split('"')[1]
        }
    }

    let submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if(!disabled) {
            let userData = {
                emailOrLogin: inputs[0].value,
                password: inputs[1].value
            }

            loginUser(userData)
        }
    }

    if(isSuccess && data) {
        cookies.set('token', data.token, {maxAge: 604800})
        dispatch(setAuth(jwtDecode(data.token)))
        navigate('/')
    }

    let inputsArray = inputs.map((item, index) => {
        return (
            <div className={s.inputDiv} key={item.id}>
                <InputWithLabelToTop
                    text={item.text}
                    type={item.type}
                    onChange={(e) => setInputs(prevState => {
                        let newState = [...prevState]
                        newState[index].value = e.target.value
                        return newState
                    })}
                    value={item.value}
                    setError={(errorStatus) => setInputs(prevState => {
                        let newState = [...prevState]
                        newState[index].errorStatus = errorStatus
                        return newState
                    })}
                    validationTypes={item.validationTypes}
                    isCurrentInputLast={index === inputs.length - 1}
                    name={item.name}
                />
            </div>
        )
    })

    return (
        <div className={s.content}>
            <form onSubmit={submitHandler}>
                {inputsArray}
                {isLoading ? <ButtonLoader /> : <button disabled={disabled}>Вход</button>}
            </form>
            <p className={s.forget}>Забыли пароль?</p>
            <Link to={'/registration'}>Ещё нет аккаунта?</Link>
            {isError && <div className={s.errorMsg}>{errorMsg}</div>}
        </div>
    );
};

export default LoginComponent;