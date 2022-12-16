import React, {useState} from 'react';
import InputWithLabelToTop from "../../UI/InputWithLabelToTop/InputWithLabelToTop";
import s from './RegisterComponent.module.css'
import {inputWithLabelToTopInterface} from "../../../models/IInputWithLabelToTopInterface";
import {userAPI} from "../../../store/services/userService";
import ButtonLoader from "../../UI/ButtonLoader/ButtonLoader";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {setAuth} from "../../../store/reducers/userReducer";
import jwtDecode from "jwt-decode";
import {useAppDispatch} from "../../../hooks/redux";


const RegisterComponent = () => {
    let [inputs, setInputs] = useState<inputWithLabelToTopInterface[]>([
        {
            id: 1,
            name: 'email',
            text: 'Email',
            type: 'text',
            value: '',
            errorStatus: true,
            validationTypes: ["isEmail", "required"]
        },
        {
            id: 2,
            name: 'login',
            text: 'Имя пользователя',
            type: 'text',
            value: '',
            errorStatus: true,
            stringBeforeErrorMessage: 'Имя пользователя должно',
            validationTypes: ["required", "noSpecialSymbols"]
        },
        {
            id: 3,
            name: 'password',
            text: 'Пароль',
            type: 'password',
            value: '',
            errorStatus: true,
            stringBeforeErrorMessage: 'Пароль должен',
            validationTypes: ["required", "isHard"]
        },
        {
            id: 4,
            name: 'confirmPassword',
            text: 'Подтвердите пароль',
            type: 'password',
            value: '',
            errorStatus: true,
            validationTypes: ["required", "isMatch"]
        }
    ])

    let [createUser, {isLoading, isError, error, isSuccess, data}] = userAPI.useRegistrationMutation()
    let dispatch = useAppDispatch()

    let navigate = useNavigate()
    const cookies = new Cookies();
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
                    stringBeforeErrorMessage={item.stringBeforeErrorMessage}
                    validationTypes={item.validationTypes}
                    isMatch={item.name === 'confirmPassword' ? inputs[2].value : null}
                    isCurrentInputLast={index === inputs.length - 1}
                    name={item.name}
                />
            </div>
        )
    })

    let disabled = inputs.some((item) => {
        return item.errorStatus
    })

    let submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if(!disabled) {
            let userData = {
                email: inputs[0].value,
                login: inputs[1].value,
                password: inputs[2].value
            }

            createUser(userData)
        }
    }


    let errorMsg: string = ''
    if(error) {
        if('data' in error) {
            errorMsg = JSON.stringify(error.data).split('"')[1]
        }
    }

    if(isSuccess && data) {
        cookies.set('token', data.token, {maxAge: 604800})
        dispatch(setAuth(jwtDecode(data.token)))
        navigate('/')
    }


    return (
        <div className={s.content}>
            <form onSubmit={submitHandler}>
                {inputsArray}
                {isLoading ? <ButtonLoader /> : <button disabled={disabled}>Регистрация</button>}
            </form>
            <Link to={'/login'}>Уже есть акканут?</Link>
            {isError && <div className={s.errorMsg}>{errorMsg}</div>}
        </div>
    )
};

export default RegisterComponent;