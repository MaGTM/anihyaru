import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h2>Произшошла непредвиденная ошибка, попробуйте позже</h2>
            <Link to={'/'} style={{backgroundColor: '#FFBA35', padding: '5px 10px', color: '#fff', marginTop: '20px', borderRadius: '5px'}}>На главную</Link>
        </div>
    );
};

export default Error;