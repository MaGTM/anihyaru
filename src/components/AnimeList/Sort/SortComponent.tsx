import React, {FC} from 'react';
import s from './SortComponent.module.css'
import SortInput from "./SortItem/SortInput";

interface SortComponentProps {
    changeParams: React.SetStateAction<any>,
    queryParams: object,
    changeSortType: (arg0: Record<string, number | string>) => void
}

const SortComponent: FC<SortComponentProps> = ({changeParams, queryParams, changeSortType}) => {

    const sortTypes: {id:number, text: string, value: string, inputType?: string, sortType?: string}[][] = [
        [
            {id: 1, text: 'По популярности', value: 'ranked', inputType:'list', sortType:'order'},
            {id: 2, text: 'По дате', value: 'aired_on'}
        ],
        [
            {id: 0, text: 'По типу', value: '', inputType:'list', sortType:'kind'},
            {id: 1, text: 'ТВ Сериал', value: 'tv'},
            {id: 2, text: 'Фильм', value: 'movie'},
            {id: 3, text: 'Спешл', value: 'special'},
            {id: 4, text: 'Ова', value: 'ova'},
        ],
        [
            {id: 0, text: 'Статус', value: '', inputType:'list', sortType:'status'},
            {id: 1, text: 'Анонс', value: 'anons'},
            {id: 2, text: 'Онгоинг', value: 'ongoing'},
            {id: 3, text: 'Завершен', value: 'released'},
        ],
        [
            {id: 0, text: 'Рейтинг', value: '', inputType:'list', sortType:'score'},
            {id: 1, text: '9+', value: '9'},
            {id: 2, text: '8+', value: '8'},
            {id: 3, text: '7+', value: '7'},
            {id: 4, text: '6+', value: '6'},
            {id: 5, text: '5+', value: '5'},
            {id: 6, text: '4+', value: '4'},
            {id: 7, text: '3+', value: '3'},
            {id: 8, text: '2+', value: '2'},
            {id: 9, text: '1+', value: '1'},
        ],
    ]

    let sortTypesArray = sortTypes.map((item, index) => {
        return <SortInput key={index} queryParams={queryParams} choicesValues={item} changeParams={changeParams} changeSortType={changeSortType}/>
    })
    return (
        <div className={s.content}>
            <div className={s.sortBlock}>
                <div className={s.sortInputsBlock}>
                    {sortTypesArray}
                </div>
            </div>
        </div>
    );
};

export default SortComponent;