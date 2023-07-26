import React, { useEffect } from "react";
import Styles from "./orders-list.module.css"

import { Link, useLocation } from 'react-router-dom';
import { OrderItem } from "../../components/order-item/order-item";
import { ROUTES, NESTED_ROUTES } from "../../utils/constants";
import { WebsocketStatus } from "../../utils/types";

import { useDispatch, useSelector } from "../../services/types/hooks";
import { feedSelector } from "../../services/selectors";
import { wsCloseAction, wsConnectAction } from "../../services/thunk/web-socket";
import { SOCKET_URL_USER_ORDERS } from "../../utils/burger-api";

export default function OrdersListPage() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { status, orders } = useSelector(feedSelector);

    useEffect(() => {
        dispatch(wsConnectAction(SOCKET_URL_USER_ORDERS));

        return () => {
            dispatch(wsCloseAction())
        }
    }, [dispatch])

    if (status === WebsocketStatus.CONNECTING) { return null }

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