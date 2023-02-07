import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        category: number,
        id: number,
        imageUrl: string,
        price: number,
        rating: number,
        sizes: number[],
        title: string,
        types: number[],
    }>();
    const {id} = useParams()

    useEffect(() => {
        axios.get(`https://63cbe49fea85515415175ead.mockapi.io/items?id=${id}`)
            .then(res => {
                setPizza(res.data[0]);
                console.log(res.data)
            })
    }, [])
    if (!pizza) {
        return <div className={'container'}><h1>Загрузка...</h1></div>;
    }
    return (
        <div className={'container'}>
            <img src={pizza.imageUrl} width={200} height={200} alt=""/>
            <h2>{pizza.title}</h2>
            <h3>{pizza.price}</h3>
            <p>{pizza.id}</p>
        </div>
    )
}

export default FullPizza