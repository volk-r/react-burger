import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Styles from './feed.module.css'
import { useSelector } from '../../services/types/hooks';
import { TOrder } from '../../utils/types';
import { OrderItem } from "../order-item/order-item";

export default function Feed(props: any) { // TODO
    const navigate = useNavigate();
    const location = useLocation();

    const { orders }: { orders: TOrder[]} = props;

    const handleOrderClick = useCallback((item: TOrder) => {
        navigate(`/feed/${item._id}`, { state: { previousLocation: location } })
    }, [navigate, location])

    return (
        <>
            <section className={ Styles.container }>
                <p className="p-1 mt-7 mb-3 text text_type_main-large">
                    Лента заказов
                </p>
                <div className={` ${ Styles.items } custom-scroll`}>
                    {orders.map(order => (
                        <OrderItem key={order._id} item={order} handleClick={handleOrderClick}/>
                    ))}
                </div>
            </section>
        </>
    );
}