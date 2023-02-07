import {useSelector} from "react-redux";
import EmptyCart from "./EmptyCart";
import NotEmptyCart from "./NotEmptyCart";
import {selectCart} from "../../../redux/slices/cartSlice";

function Cart() {
    const {items} = useSelector(selectCart);

    const loadCart = () => {
        if (items.length > 0) {
            return <NotEmptyCart/>
        } else {
            return <EmptyCart/>
        }
    }
    return <div className="content">
        <div className="container container--cart">
            {loadCart()}
        </div>
    </div>
}

export default Cart;