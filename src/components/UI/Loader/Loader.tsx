import React, {FC} from 'react';
import s from './Loader.module.css'

interface LoaderProps {
    blockAmount: number,
    loaderClassName: string
}

const Loader: FC<LoaderProps> = ({blockAmount, loaderClassName}) => {
    let divArray: React.ReactNode[] = []
    for(let i = 0; i < blockAmount; i++) {
        divArray.push(<div className={s.loaderBlock} key={i}/>)
    }

    return (
        <div className={loaderClassName + ' ' + s.loaderBasic} >
            {divArray}
        </div>
    );
};

export default Loader;