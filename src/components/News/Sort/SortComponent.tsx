import React, {FC, useState} from 'react';
import s from './SortComponent.module.css'
import ArrowIcon from "../../UI/Icons/ArrowIcon";

interface SortComponentProps {
    currentSort: number,
    sortOptions: {id: number, title: string}[],
    setCurrentSort: React.SetStateAction<any>
}

const SortComponent: FC<SortComponentProps> = ({currentSort, sortOptions, setCurrentSort}) => {

    let [isOpen, setIsOpen] = useState(false)

    let openHandler = () => {
        switch (isOpen) {
            case false:
                setIsOpen(true)
                break
            case true:
                setIsOpen(false)
                break
        }
    }

    let options = sortOptions.map((item) => {
        if(item.id === currentSort) return
        return <span onClick={() => setCurrentSort(item.id)} key={item.id}>{item.title}</span>
    })

    return (
        <div className={s.sortBlock}>
            <label htmlFor="sort">Сортировка</label>
            <div className={s.select + ' ' + (isOpen ? s.active : '')} onClick={openHandler}>
                <span>{sortOptions[currentSort].title}<ArrowIcon /></span>
                <div className={s.options}>
                    {options}
                </div>
            </div>
        </div>
    );
};

export default SortComponent;