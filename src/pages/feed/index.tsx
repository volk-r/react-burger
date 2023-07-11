import React from "react";
import styles from "./feed.module.css";
import AppHeader from "../../components/header/header";
import Feed from "../../components/feed/feed";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector } from '../../services/types/hooks';
import FeedActivity from "../../components/feed-activity/feed-activity";

export default function FeedPage() {
    const orders =  [{
        "success": true,
        "name": "Люминесцентный флюоресцентный бургер",
        "order": {
            "ingredients": [
                {
                    "_id": "643d69a5c3f7b9001cfa093e",
                    "name": "Филе Люминесцентного тетраодонтимформа",
                    "type": "main",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                }
            ],
            "_id": "64aaee8612f4a2001bd5c9ac",
            "owner": {
                "name": "Roman",
                "email": "romanov-ro@list.ru",
                "createdAt": "2023-06-06T12:41:29.625Z",
                "updatedAt": "2023-06-24T18:32:03.212Z"
            },
            "status": "done",
            "name": "Люминесцентный флюоресцентный бургер",
            "createdAt": "2023-07-09T17:29:42.098Z",
            "updatedAt": "2023-07-09T17:29:42.225Z",
            "number": 11646,
            "price": 1976
        }
    }]

    const total = 1976;
    const totalToday = 3;
    // const { orders, total, totalToday } = useSelector((state) => state.orders);

    if (orders.length === 0) {
        return null;
    }

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <Feed />
                <FeedActivity orders={orders} total={total} totalToday={totalToday} />
                {
                    // <p>Тут что-то будет</p>
                    // isLoading === false
                    // && hasError === false
                    // && (
                    //     && <BurgerConstructor />
                    // )
                }
            </main>
        </>
    );
}