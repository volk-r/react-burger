import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './feed.module.css'
import { TOrder } from '../../utils/types';
import { OrderItem } from "../order-item/order-item";
import { ROUTES } from "../../utils/constants";

export const Feed = memo((props: { orders: TOrder[]}) => {
    const { orders } = props
    const location = useLocation();

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
})