import React from 'react';
import s from './ButtonLoader.module.css'

const ButtonLoader = () => {
    return (
        <button disabled className={s.button}>
            <div className={s.loader} />
        </button>
    );
};

export default ButtonLoader;