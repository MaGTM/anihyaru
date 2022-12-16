import React, {FC} from 'react';
import s from './EmptyContent.module.css'

interface EmptyContentProps {
    marginDif?: {};
}

const EmptyContent: FC<EmptyContentProps> = ({marginDif}) => {
    return (
        <h2 className={s.empty} style={marginDif}>
            Тут пока пусто :(
        </h2>
    );
};

export default EmptyContent;