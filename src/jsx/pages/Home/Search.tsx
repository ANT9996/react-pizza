import React, {useCallback, useRef, useState} from "react";
import styles from './Search.module.scss'
import lens from '../../../assets/img/search-svgrepo-com.svg'
import cross from '../../../assets/img/cross.svg'
import {useDispatch} from "react-redux";
import {setSearch} from "../../../redux/slices/filterSlice";
import debounce from "lodash.debounce"

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);
// redux
    const dispatch = useDispatch();
// state
    const [value, setValue] = useState<string>('')
// func
    const onClickClear = () => {
        dispatch(setSearch(''));
        setValue('');
        setSearch('')
        inputRef?.current?.focus()
    }
    const updateSearchValue = useCallback(
        debounce((str:string) => {
            dispatch(setSearch(str));
        }, 500),
        []
    )
    const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value)
    }


    return (
        <div className={styles.root}>
            <img className={styles.icon} src={lens} alt=""/>
            <div className={styles.group}>
                <input className={styles.input}
                       ref={inputRef}
                       placeholder={'Поиск пиццы ...'} value={value}
                       onChange={(e) => onChangeInput(e)}/>
                <img className={`${styles.clear}`} onClick={() => onClickClear()} src={cross} alt=""/>
            </div>
        </div>
    )
}

export default Search;