import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import getCartFromLS from "../../utils/getCartFromLS";
import {RootState} from "../store";

export type CartItem = {
    id:number,
    title:string,
    price:number,
    type:string,
    size:number,
    count:number,
    imageUrl?:string
}

interface CartSliceState {
    items: CartItem[]
}

const initialState: CartSliceState = {
    items: getCartFromLS(),
};

const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            addItem(state, action:PayloadAction<CartItem>) {
                const findItem = state.items.find((obj:CartItem) =>
                    obj.id === action.payload.id
                    && obj.type === action.payload.type
                    && obj.size === action.payload.size
                )

                if (findItem) {
                    findItem.count++
                } else {
                    state.items.push({...action.payload, count: 1});
                }
            },
            minusItem(state, action:PayloadAction<CartItem>) {
                const findItem = state.items.find((obj:CartItem) =>
                    obj.id === action.payload.id
                    && obj.type === action.payload.type
                    && obj.size === action.payload.size
                )
                if (findItem)
                if (findItem.count > 1) {
                    findItem.count--;
                }
            },
            removeItem(state, action:PayloadAction<CartItem>) {
                const index:number = state.items.findIndex((obj:CartItem) =>
                    obj.id === action.payload.id
                    && obj.type === action.payload.type
                    && obj.size === action.payload.size)
                state.items = state.items.filter((obj:CartItem, i:number) => i !== index)

            },
            clearItems(state) {
                state.items = []
            }
        }
    }
);
export const selectCart = (state:RootState) => state.cartSlice;
export const selectCartItemByArgs = (id:number, type:string, size:number) =>
    (state:RootState) => state.cartSlice.items.find((obj:CartItem) =>
    obj.id === id
    && obj.type === type
    && obj.size === size);
export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions;
export default cartSlice.reducer;