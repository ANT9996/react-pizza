import Sort from "./Sort";
import PizzaBlock from "./PizzaBlock";
import MyLoader from "./MyLoader";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
import Categories from "./Categories";
import {useSelector} from "react-redux";
import qs from "qs";
import {selectFilter, setFilters} from "../../../redux/slices/filterSlice";
import {fetchPizzas, selectPizza, Status} from "../../../redux/slices/pizzaSlice";
import {list} from "../../../assets/data";
import {useAppDispatch} from "../../../redux/store";

const Home: React.FC = React.memo(
    () => {
        const navigate = useNavigate();
        const isSearch = useRef(false)
        const isMounted = useRef(false)
// redux
        const dispatch = useAppDispatch()
        const {categoryId, order, search, sort} = useSelector(selectFilter);
        const {items, status} = useSelector(selectPizza)
// state
        const [contentLoading, setContentLoading] = useState(true);
// func
        //рендер пицц
        const loadPizzas = () => {
            return !contentLoading
                ? items
                    .filter((item) => item.title.toLowerCase().toLowerCase().includes(search))
                    .map((item) => <PizzaBlock key={item.id} {...item}/>)
                : [...Array(8)].map((elem, i) => <MyLoader key={i}/>)
        }
        //запрос данных из базы данных
        const getPizzas = async () => {
            setContentLoading(true);
            await dispatch(fetchPizzas({categoryId: Number(categoryId), sortProperty: sort.sortProperty, order}));
            setContentLoading(false);

            if (isMounted.current) {
//            Данные из редакса в адресную строку
                const queryString = qs.stringify({
                    category: categoryId === 0 ? '' : categoryId,
                    sortId: Number(sort.id),
                    order,
                });
                navigate(`?${queryString}`);
                console.log('queryString', '|', queryString);
            }
            isMounted.current = true;
        }
// effects
        useEffect(() => {
            window.scrollTo(0, 0);
            if (window.location.search) {
                const {category, sortId, order} = qs.parse(window.location.search.substring(1));
                console.log({category, sortId, order, search}, 'effect')
                dispatch(setFilters({
                    categoryId: Number(category) === 0 ? '' : Number(category),
                    sort: {
                        id: Number(sortId),
                        name: list[Number(sortId)].name,
                        sortProperty: list[Number(sortId)].sortProperty,
                    },
                    order: order === 'asc' ? 'asc' : 'desc',
                    search
                }));
                isSearch.current = true;
            }

        }, []);
        useEffect(() => {
            if (!isSearch.current) {
                getPizzas();
            }
            isSearch.current = false
        }, [categoryId, sort, order])
        return (
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            status === Status.ERROR
                                ? (
                                    <div className={'flex-center'}>
                                        <h2>Произошла ошибка</h2>
                                        <p>Не удалось загрузить пиццы :(</p>
                                    </div>
                                )
                                : loadPizzas()
                        }
                    </div>
                </div>
            </div>
        )
    }
)

export default Home;