import {CartItem} from "../redux/slices/cartSlice";

const calcTotalCount = (items:CartItem[]):number => {
    return items.reduce((sum:number, obj:any) => {
        return sum + obj.count
    }, 0)
}

export default calcTotalCount;