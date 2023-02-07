import {CartItem} from "../redux/slices/cartSlice";

const calcTotalPrice = (items:CartItem[]) => {
    return items.reduce((sum:number, obj:any) => {
        return sum + (obj.count * obj.price)
    }, 0)
}

export default calcTotalPrice;