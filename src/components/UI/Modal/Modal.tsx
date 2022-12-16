import React, {FC} from 'react';
import s from './Modal.module.css'

interface ModalProps {
    zIndex: number,
    isActive: boolean,
    closeFun: () => void,
}

const Modal: FC<ModalProps> = ({zIndex, isActive, closeFun}) => {
    return <div onClick={closeFun}
                className={s.modal + ' ' + (isActive ? s.active : '')}
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'black',
                    position: 'absolute',
                    top: parseInt(document.body.style.top.split('px')[0]) * -1,
                    zIndex,
                    left: '0',
                    display: `${isActive ? '' : 'none'}`
                }}
    />;
};

export default Modal;