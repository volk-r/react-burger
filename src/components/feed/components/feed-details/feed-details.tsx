import React, { FC, useEffect } from 'react';
import Styles from ".//feed-details.module.css";
import { OrderStatus } from '../../../order-status/order-status'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ROUTES } from "../../../../utils/constants";
import { TOrder, WebsocketStatus } from "../../../../utils/types";

import { feedSelector, getIngredientsMap, isLoadingIngredientsSelector } from "../../../../services/selectors";
import { wsCloseAction, wsConnectAction } from "../../../../services/thunk/web-socket";
import { useDispatch, useSelector } from "../../../../services/types/hooks";
import { SOCKET_URL_ORDERS_ALL, SOCKET_URL_USER_ORDERS } from "../../../../utils/burger-api";
import { Preload } from "../../../preload";

type TFeedDetails = {
    allignCenter?: boolean,
}

export const FeedDetails: FC<TFeedDetails> = ( props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingIngredientsSelector);
    const location = useLocation();

    const { allignCenter } = props;

    const navigate = useNavigate();
    const { feedId, ordersId } = useParams();
    const searchId = feedId ?? ordersId;

    useEffect(() => {
        let URL = null

        if (location.pathname.indexOf(ROUTES.ROUTE_PROFILE_PAGE) !== -1) {
            URL = SOCKET_URL_USER_ORDERS;
        }
        else if (location.pathname.indexOf(ROUTES.ROUTE_FEED_PAGE) !== -1) {
            URL = SOCKET_URL_ORDERS_ALL;
        } else {
            dispatch(wsCloseAction())

            return;
        }

        dispatch(wsConnectAction(URL));

        return () => {
            dispatch(wsCloseAction())
        }
    }, [])

    const { status, orders } = useSelector(feedSelector);
    const ingredientsMap = useSelector(getIngredientsMap);

    if (
        status === WebsocketStatus.CONNECTING
        || orders.length === 0
        || isLoading === true
    ) {
        return <Preload/>;
    }

    const selectedOrder: TOrder | undefined = orders.find(({ _id }) => _id === searchId)

    if (!selectedOrder) {
        navigate( ROUTES.ROUTE_FEED_PAGE , { replace: true })
        return null;
    }

    type TIngredientsSummary = { _id: string; name: string; qty: number; price: number; image_mobile: string };

    const { totalPrice, ingredients } = selectedOrder.ingredients.reduce(
        (acc, _id) => {
            acc.totalPrice += ingredientsMap[_id].price
            const existingIngredient = acc.ingredients.find(item => item._id === _id)
            if (existingIngredient && existingIngredient.qty) {
                existingIngredient.qty++
            } else {
                acc.ingredients.push({
                    _id,
                    name: ingredientsMap[_id].name,
                    price: ingredientsMap[_id].price,
                    image_mobile: ingredientsMap[_id].image_mobile,
                    qty: 1
                })
            }
            return acc
        }, {totalPrice: 0, ingredients: []} as { totalPrice: number, ingredients: TIngredientsSummary[]
    })

    const classOrderNumber = allignCenter ? 'mb-10' : `${Styles.orderNumber} mb-5`;

    return (
        <>
        <h1 className={`${classOrderNumber} text text_type_digits-default`}>#{selectedOrder.number}</h1>
        <div key={selectedOrder.number} className={Styles.body}>
            <p className='text text_type_main-medium mb-3'>{selectedOrder.name}</p>
            <OrderStatus status={selectedOrder.status} />
            <p className='text text_type_main-medium mt-10 mb-6'>Состав:</p>
            <div className={`${Styles.table} custom-scroll pr-6`}>
                {ingredients.map(item => (
                    <div key={item._id} className={Styles.row}>
                        <div className={Styles.item}>
                            <div className={Styles.gradient}>
                                <div className={Styles.thumb}>
                                    <img src={item.image_mobile} alt={item.name} />
                                </div>
                            </div>
                            <p className={`${Styles.name} text text_type_main-default`}>{item.name}</p>
                        </div>
                        <p className={`${Styles.price} text text_type_digits-default`}>
                            {item.qty} x {item.price} <CurrencyIcon type="primary"/>
                        </p>
                    </div>
                ))}
            </div>
            <div className={`${Styles.footer} mt-10 mb-10 mr-7 `}>
                <FormattedDate className='text_type_main-default text_color_inactive' date={new Date(selectedOrder.createdAt)}/>
                <p className={`${Styles.price} text text_type_digits-default`}>
                    {totalPrice} <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
        </>
    )
}