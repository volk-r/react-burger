import React, {FC} from 'react';
import Styles from ".//feed-details.module.css";
import { useSelector } from "react-redux";
import { OrderStatus } from '../../../order-status/order-status'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from "../../../../utils/constants";
import { TOrder, TIngredient } from "../../../../utils/types";

import { orders } from "../../../../utils/data";

export const FeedDetails: FC = () => {
    const navigate = useNavigate();
    const { feedId } = useParams();
    // const orders: Array<TOrder> | [] = useSelector(ordersSelector);
    // TODO
    // @ts-ignore
    const selectedOrder: TOrder | undefined = orders.find(({ _id }) => _id === feedId)

    if (!selectedOrder) {
        navigate( ROUTES.ROUTE_FEED_PAGE , { replace: true })
        return null;
    }

    type TIngredientsSummary = { _id: string; name: string; count: number; totalPrice: number; image_mobile: string };
    const ingredients: TIngredientsSummary[] = [];
    let totalPrice = 0;

    selectedOrder.ingredients.forEach((ingredient) => {
        const existingIngredient = ingredients.find((x: TIngredientsSummary) => x._id === ingredient._id);
        totalPrice += ingredient.price;
        if (existingIngredient) {
            existingIngredient.count++;
            existingIngredient.totalPrice += ingredient.price;
        } else {
            ingredients.push({
                _id: ingredient._id,
                name: ingredient.name,
                count: 1,
                totalPrice: ingredient.price,
                image_mobile: ingredient.image_mobile,
            });
        }
    });

    return (
        <Link
            key={ selectedOrder._id }
            to={{ pathname: `/feed/${selectedOrder._id}` }}
            replace={ true }
            className={ Styles.isDisabled }
        >
        <div className={Styles.body}>
            <p className='text text_type_main-medium mt-10 mb-3'>{selectedOrder.name}</p>
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
        </Link>
    )
}