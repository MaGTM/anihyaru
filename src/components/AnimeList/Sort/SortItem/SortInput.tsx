import React, {FC, useState} from 'react';
import s from "./SortInput.module.css";
import ArrowIcon from "../../../UI/Icons/ArrowIcon";

interface SortInputProps {
    choicesValues: {id:number, text: string, value: string, inputType?: string, sortType?: string}[],
    changeParams: React.SetStateAction<any>,
    queryParams: object,
    changeSortType: (arg0: Record<string, number | string>) => void
}

const SortInput: FC<SortInputProps> = ({choicesValues, changeParams, queryParams, changeSortType}) => {
    switch (choicesValues[0].inputType) {
        case 'list':
            return (<ListInput queryParams={queryParams} choicesValues={choicesValues} changeParams={changeParams} changeSortType={changeSortType}/>)
        case 'checkbox':
            return <CheckboxInput queryParams={queryParams} choicesValues={choicesValues} changeParams={changeParams} changeSortType={changeSortType} />
        default:
            return <div />
    }
};


const ListInput: FC<SortInputProps> = ({queryParams, choicesValues, changeParams, changeSortType}) => {
    let [type, setType] = useState<string>(choicesValues[0].text)
    let [isOpen, setIsOpen] = useState<boolean>(false)

    let isOpenChangeHandler = () => {
        switch (isOpen) {
            case false:
                setIsOpen(true)
                break
            case true:
                setIsOpen(false)
                break
        }
    }

    let typeChangeHandler = (e: React.MouseEvent, text: string, value: string): void => {
        e.preventDefault()
        let newParams: {[index: string]:any} = {...queryParams}
        newParams[choicesValues[0].sortType ? choicesValues[0].sortType : ''] = value
        newParams['page'] = 1
        changeSortType(newParams)
        setType(text)
    }

    let choicesArray = choicesValues.map(item => {
        return (
            <div key={item.id}
                 className={s.choiceItem + ' ' + (type === item.text && s.active)}
                 onMouseDown={(e) => typeChangeHandler(e, item.text, item.value)}
            >
                <p>{item.id === 0 ? '...' : item.text}</p>
            </div>
        )
    })

    return (
        <div className={s.sortInput}>
            <label className={s.listSortInput}>
                <input readOnly
                       type="text"
                       onClick={isOpenChangeHandler}
                       onBlur={() => setIsOpen(false)}
                />
                <h3>{type}</h3>
                <ArrowIcon/>
            </label>
            <div className={s.choicesBlock} style={{display: `${isOpen ? 'block' : 'none'}`}}>
                <div className={s.choicesList}>
                    {choicesArray}
                </div>
            </div>
        </div>
    );
}

const CheckboxInput: FC<SortInputProps> = ({queryParams, choicesValues, changeParams, changeSortType}) => {
    let [isChecked, setIsChecked] = useState<boolean>(false)

    let isCheckedSwitchHandler = (): void => {
        switch (isChecked) {
            case false:
                setIsChecked(true)
                break
            case true:
                setIsChecked(false)
                break
        }
    }
    return (
        <div className={s.sortInput}>
            <label className={s.checkboxSortInput}>
                <input type="checkbox" checked={isChecked} onClick={isCheckedSwitchHandler}/>
                <h3>{choicesValues[0].text}</h3>
                <div className={s.checkbox + ' ' + (isChecked && s.active)} />
            </label>
        </div>
    )
}

export default SortInput;