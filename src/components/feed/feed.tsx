import React, { useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './feed.module.css'
import { useSelector } from '../../services/types/hooks';
import { TOrder } from '../../utils/types';
import { OrderItem } from "../order-item/order-item";
import { ROUTES } from "../../utils/constants";
import {orders} from "../../utils/data";

export default function Feed(props: { orders: TOrder[]}) {
    const location = useLocation();

    const { orders } = props;// TODO

    return (
        <>
            <section className={ Styles.container }>
                <p className="p-1 mt-7 mb-3 text text_type_main-large">
                    Лента заказов
                </p>
                {orders.length === 0
                    ? <p className={`${Styles.shadow} text text_type_main-medium ml-20 mt-20`}>Свободная касса!</p>
                    : <div className={` ${Styles.items} custom-scroll`}>
                        {orders.map(order => (
                            <Link
                                key={order._id}
                                to={{pathname: ROUTES.ROUTE_FEED_PAGE + `/${order._id}`}}
                                state={{background: location}}
                                className={Styles.isDisabled}
                            >
                                <OrderItem key={order._id} item={order}/>
                            </Link>
                        ))}
                    </div>
                }
            </section>
        </>
    );
}