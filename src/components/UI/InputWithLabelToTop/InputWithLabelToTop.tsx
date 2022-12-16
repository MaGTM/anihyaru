import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import s from "./InputWithLabelToTop.module.css";
import InputError from "../Error/InputError";
import {useFirstRender} from "../../../hooks/useFirstRender";
import {validations} from "../../../types/types";
import EyeIcon from "../Icons/EyeIcon";
import ClosedEyeIcon from "../Icons/ClosedEyeIcon";

interface InputWithLabelToTopProps {
    time?: number
    text: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    setError: (errorStatus: boolean) => void,
    stringBeforeErrorMessage?: string,
    validationTypes: validations[],
    isMatch?: string | null,
    type: string,
    isCurrentInputLast?: boolean,
    name: string
}

const InputWithLabelToTop: FC<InputWithLabelToTopProps> = (props) => {
    let firstRender = useFirstRender()
    let [focus, setFocus] = useState<boolean>(false)
    let [inputValidity, setInputValidity] = useState({errorMessage: '', errorStatus: false})
    let [isTouched, setIsTouched] = useState<boolean>(false)
    let [isPassShow, setIsPassShow] = useState(false)

    let {
        time = 300,
        text,
        onChange,
        value,
        setError,
        stringBeforeErrorMessage,
        validationTypes,
        isMatch,
        isCurrentInputLast,
        name,
        type,
        ...inputProps
    } = props

    let focusHandler = (e: React.FocusEvent<HTMLInputElement>): void => {
        switch (focus) {
            case true:
                setIsTouched(true)
                if (!e?.target.value) { // Если поле пустое, то убирать лейбл вниз при фокусе
                    setFocus(false)
                }
                e?.target.setCustomValidity(validation(e?.target.value, validationTypes, isMatch, stringBeforeErrorMessage))
                setInputValidity({
                    errorMessage: e?.target.validationMessage,
                    errorStatus: e?.target.validity.customError
                })
                break
            case false:
                setFocus(true)
                break
        }
    }


    let inputHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true)
        setIsTouched(true)
        e?.target.setCustomValidity(validation(e?.target.value, validationTypes, isMatch, stringBeforeErrorMessage))
        setInputValidity({errorMessage: e?.target.validationMessage, errorStatus: e?.target.validity.customError})
    }

    let changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        e?.target.setCustomValidity(validation(e?.target.value, validationTypes, isMatch, stringBeforeErrorMessage))
        setInputValidity({errorMessage: e?.target.validationMessage, errorStatus: e?.target.validity.customError})
        if (isCurrentInputLast) {
            setError(inputValidity.errorStatus)
        }
    }

    useLayoutEffect(() => {
        if (!firstRender) {
            setError(inputValidity.errorStatus)
        }
    }, [inputValidity.errorStatus, isTouched])

    let changePasShowHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        switch (isPassShow) {
            case true:
                setIsPassShow(false)
                break
            case false:
                setIsPassShow(true)
                break
        }
    }


    return (
        <label className={s.block + ' ' + (focus && s.focus)}>
            <p style={{transition: `all ${time}ms ease-in`}}>{text}</p>
            <input onInput={inputHandler} onFocus={focusHandler} onBlur={focusHandler} onChange={changeHandler}
                   type={isPassShow ? 'text' : type} {...inputProps} value={value}/>
            {name === 'password' || name === 'confirmPassword' ? isPassShow ?
                <EyeIcon className={s.showPas} onClick={changePasShowHandler}/> :
                <ClosedEyeIcon className={s.showPas} onClick={changePasShowHandler}/> : ''}
            {inputValidity.errorStatus && <InputError errorMessage={inputValidity.errorMessage}/>}
        </label>
    );
};

const validation = (value: string, validationTypes: Record<number, string>, isMatch?: string | null, stringBeforeErrorMessage?: string): string => {
    const regExp = {
        email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
        username: /^[A-Za-z0-9-_]{3,16}$/,
        password: /^(?=.*[A-Z])(?=.*[!@#$&*.])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
    }
    for (let index in validationTypes) {
        switch (validationTypes[index]) {
            case 'required':
                if (!value) {
                    return 'Заполните это поле'
                }
                break
            case 'isEmail':
                if (!regExp.email.test(value)) return 'Введен некорректный email'
                break
            case 'noSpecialSymbols':
                if (!regExp.username.test(value)) return `${stringBeforeErrorMessage} содержать цифры, строчные буквы, символы "-" и "_", и иметь длину от 3 до 16 символов`
                break
            case 'isHard':
                if (!regExp.password.test(value)) return `${stringBeforeErrorMessage} содержать строчные и заглавные буквы, специальные символы, цифры и иметь длину более 8 символов`
                break
            case 'isMatch':
                if (value !== isMatch) return 'Пароли не совпадают'
                break
        }
    }

    return ''
}

export default InputWithLabelToTop;