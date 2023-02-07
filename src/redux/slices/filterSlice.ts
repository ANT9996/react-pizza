import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

type Sort = {
    id: number
    name: string,
    sortProperty: string,
}

interface FilterSlice {
    categoryId: number | string,
    sort: Sort,
    order: string,
    search: string,
}

const initialState:FilterSlice = {
    categoryId: 0,
    sort: {
        id: 0,
        name: 'популярности',
        sortProperty: 'rating',
    },
    order: 'asc',
    search: '',
};

const filterSlice = createSlice({
        name: 'filter',
        initialState,
        reducers: {
            setCategoryId(state, action: PayloadAction<number>) {
                state.categoryId = action.payload
            },
            setOrder(state, action: PayloadAction<string>) {
                state.order = action.payload
            },
            setSearch(state, action: PayloadAction<string>) {
                state.search = action.payload
            },
            setSort(state, action: PayloadAction<Sort>) {
                console.log(action.payload)
                state.sort = action.payload
            },
            setFilters(state, action: PayloadAction<FilterSlice>) {
                console.log({...action.payload}, 'slice')
                state.sort = {
                    id: action.payload.sort.id,
                    name: action.payload.sort.name,
                    sortProperty: action.payload.sort.sortProperty,
                };
                state.categoryId = action.payload.categoryId === '' ? 0 : Number(action.payload.categoryId);
                state.order = action.payload.order;
            }
        }
    }
);
export const selectFilter = (state:RootState) => state.filterSlice;
export const {setCategoryId, setOrder, setSearch, setSort, setFilters} = filterSlice.actions;
export default filterSlice.reducer;