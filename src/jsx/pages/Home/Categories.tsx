import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId} from "../../../redux/slices/filterSlice";
import {categories} from "../../../assets/data";


const Categories: React.FC = React.memo(
    () => {
        const dispatch = useDispatch();
        const {categoryId} = useSelector(selectFilter)
        const onClickCategory = (index: number) => {
            dispatch(setCategoryId(index));
        }

        const renderCategories = () => {
            return categories.map((item, i) => (
                    <li
                        key={i}
                        onClick={() => onClickCategory(i)}
                        className={categoryId === i ? 'active' : ''}
                    >
                        {item}
                    </li>
                )
            )
        }
        return (
            <div className="categories">
                <ul>
                    {renderCategories()}
                </ul>
            </div>
        );
    }
)

export default Categories;