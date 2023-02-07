import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

type Args = {
    categoryId: number,
    sortProperty: string,
    order: string,
}

type Pizza = {
    id: number,
    title: string,
    price: number,
    types: number[],
    sizes: number[],
    count: number,
    imageUrl: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSlice {
    items: Pizza[],
    status: string
}

export const fetchPizzas = createAsyncThunk<Pizza[], Args>(
    'pizza/fetchPizzasStatus',
    async ({categoryId, sortProperty, order}) => {
        const {data} = await axios.get<Pizza[]>(`https://63cbe49fea85515415175ead.mockapi.io/items?category=${categoryId === 0 ? '' : categoryId}&sortBy=${sortProperty}&order=${order}`)
        return data;
    }
)

const initialState: PizzaSlice = {
    items: [],
    status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
        name: 'pizza',
        initialState,
        reducers: {
            setItems(state, action) {
                state.items = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchPizzas.pending, (state) => {
                console.log('Идет отправка запроса...');
                state.status = Status.LOADING;
                state.items = [];
            });
            builder.addCase(fetchPizzas.fulfilled, (state, action) => {
                console.log('Ответ принят', action.payload)
                state.items = action.payload;
                state.status = Status.SUCCESS;
            });
            builder.addCase(fetchPizzas.rejected, (state, action) => {
                console.log('Произошла ошибка! | Ответ от сервера:', action.error.message)
                state.status = Status.ERROR;
                state.items = [];
            });
        }
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         console.log('Идет отправка...');
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         console.log('Ответ принят', action.payload)
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         console.log('Произошла ошибка! | Ответ от сервера:', action.error.message)
    //         state.status = 'error';
    //         state.items = [];
    //     }
    // }
    }
);
export const selectPizza = (state: RootState) => state.pizzaSlice;
export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;