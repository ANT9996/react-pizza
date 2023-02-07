import React from "react";
import Header from "./jsx/Header";
import NotFound from "./jsx/pages/404/NotFound";
import {Route, Routes} from "react-router-dom";
import Home from "./jsx/pages/Home/Home";
import Cart from "./jsx/pages/Cart/Cart";
import FullPizza from "./jsx/pages/FullPizza";

const App = React.memo(
    () => {
        return (
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/*'} element={<NotFound/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'pizza/:id'} element={<FullPizza/>}/>
                </Routes>
            </div>
        );
    }
)

export default App;
