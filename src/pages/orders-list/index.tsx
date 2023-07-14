import React from "react";
import Styles from "./orders-list.module.css"

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { OrderItem } from "../../components/order-item/order-item";
import { ROUTES, NESTED_ROUTES } from "../../utils/constants";
import {TOrder} from "../../utils/types";

import { orders } from "../../utils/data";//todo

export default function OrdersListPage() {
    const location = useLocation();

    return (
        <>
        {orders.length === 0
            ? <p className={`${Styles.shadow} text text_type_main-small mt-15`}>История заказов отсутствует :(</p>
            : <section className={ Styles.container }>
                <div className={` ${ Styles.items } custom-scroll`}>
                    {orders.map(order => (
                        <Link
                            key={ order._id }
                            to={{ pathname: `${ROUTES.ROUTE_PROFILE_PAGE}${NESTED_ROUTES.PROFILE_ORDER_LIST_PAGE}/${order._id}` }}
                            state={{ background: location }}
                            className={ Styles.isDisabled }
                        >
                            <OrderItem key={order._id} item={order}/>
                        </Link>
                    ))}
                </div>
            </section>
        }
        </>
    );
}