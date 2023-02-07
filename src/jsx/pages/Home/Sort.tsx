import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setOrder, setSort} from "../../../redux/slices/filterSlice";
import {list} from '../../../assets/data';

const Sort = React.memo(
    () => {
// redux
        const dispatch = useDispatch();
        const {order, sort} = useSelector(selectFilter)
// state
        const [sortOpened, setSortOpened] = useState(false)
        const [sortRotate, setSortRotate] = useState(false)

        const sortRef = useRef<HTMLDivElement & {}>(null)
        const sortName = sort.name
// func
        const onClickListItem = async (index:number) => {
            await setSortOpened(false);
            dispatch(setSort(
                {
                    id: index,
                    name: list[index].name,
                    sortProperty: list[index].sortProperty,
                }
            ));
        }
        const onClickSortArrow = () => {
            if (order === 'asc') {
                dispatch(setOrder('desc'));
                setSortRotate(true);
                return
            }
            dispatch(setOrder('asc'));
            setSortRotate(false);
        }
        const handleClickOutside = (event:MouseEvent) => {
            if (sortRef.current)
                if (!event.composedPath().includes(sortRef.current)) setSortOpened(false)
        }

// effect
        useEffect(() => {
            if (order === 'desc') {
                setSortRotate(true);
            }
        }, [order])
        useEffect(() => {
            document.body.addEventListener('click', handleClickOutside)
            return () => {
                document.body.removeEventListener('click', handleClickOutside)
            }
        }, [])
        return (
            <div ref={sortRef} className="sort">
                <div className="sort__label">
                    <svg
                        onClick={onClickSortArrow}
                        className={sortRotate ? 'sortRotate' : ''}
                        width="15"
                        height="15"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#FF4500FF"
                        />
                    </svg>
                    <b>Сортировка по:</b>
                    <span onClick={() => setSortOpened(!sortOpened)}>{sortName}</span>
                </div>
                {
                    sortOpened && (
                        <div className="sort__popup">
                            <ul>
                                {
                                    list.map((item, i) => <li key={i} onClick={() => onClickListItem(i)}
                                                              className={i === sort.id ? 'active' : ''}>{item.name}</li>)
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        );
    }
)

export default Sort