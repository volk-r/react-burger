import React, { FC, useEffect } from 'react';
import Styles from ".//feed-details.module.css";
import { OrderStatus } from '../../../order-status/order-status'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

import { useNavigate, useParams } from 'react-router-dom';
import { NESTED_ROUTES, ROUTES } from "../../../../utils/constants";
import { TIngredient, TOrder, WebsocketStatus } from "../../../../utils/types";

import { feedSelector, getIngredientsMap, ingredientsSelector } from "../../../../services/selectors";
import { wsCloseAction, wsConnectAction } from "../../../../services/thunk/web-socket";
import { useDispatch, useSelector } from "../../../../services/types/hooks";
import { getIngredientsList } from "../../../../services/thunk/burger-ingredients";
import { SOCKET_URL_ORDERS_ALL, SOCKET_URL_USER_ORDERS } from "../../../../utils/burger-api";

type TFeedDetails = {
    allignCenter?: boolean,
    route: string,
}

export const FeedDetails: FC<TFeedDetails> = ( props) => {
    const dispatch = useDispatch();
    const ingredientsList: Array<TIngredient> | [] = useSelector(ingredientsSelector);

    const { allignCenter, route } = props;

    const navigate = useNavigate();
    const { feedId, ordersId } = useParams();
    const searchId = feedId ?? ordersId;

    useEffect(() => {
        if (ingredientsList.length === 0) {
            dispatch(getIngredientsList())
        }

        dispatch(wsConnectAction(
            route === `${ROUTES.ROUTE_PROFILE_PAGE}${NESTED_ROUTES.PROFILE_ORDER_DETAILS_PAGE}`
                ? SOCKET_URL_USER_ORDERS
                : SOCKET_URL_ORDERS_ALL
        ));

        return () => {
            dispatch(wsCloseAction())
        }
    }, [])

    const { status, orders } = useSelector(feedSelector);
    const ingredientsMap = useSelector(getIngredientsMap);

    if (status == WebsocketStatus.CONNECTING || ingredientsList.length === 0 || orders.length === 0) {
        return null;
    }

    const selectedOrder: TOrder | undefined = orders.find(({ _id }) => _id === searchId)

    if (!selectedOrder) {
        navigate( ROUTES.ROUTE_FEED_PAGE , { replace: true })
        return null;
    }

    type TIngredientsSummary = { _id: string; name: string; count: number; totalPrice: number; image_mobile: string };
    const ingredients: TIngredientsSummary[] = [];
    let totalPrice = 0;

    selectedOrder.ingredients.forEach((ingredient) => {
        const existingIngredient = ingredients.find((x: TIngredientsSummary) => x._id === ingredient._id);
        totalPrice += ingredientsMap[String(ingredient)].price;
        if (existingIngredient) {
            existingIngredient.count++;
            existingIngredient.totalPrice += ingredientsMap[String(ingredient)].price;
        } else {
            ingredients.push({
                _id: String(ingredient),
                name: ingredientsMap[String(ingredient)].name,
                count: 1,
                totalPrice: ingredientsMap[String(ingredient)].price,
                image_mobile: ingredientsMap[String(ingredient)].image_mobile,
            });
        }
    });

    const classOrderNumber = allignCenter ? 'mb-10' : `${Styles.orderNumber} mb-5`;

    return (
        <>
        <h1 className={`${classOrderNumber} text text_type_digits-default`}>#{selectedOrder.number}</h1>
        <div className={Styles.body}>
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
                            {item.count} x {item.totalPrice} <CurrencyIcon type="primary"/>
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