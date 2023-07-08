import React from 'react';

import DoneLogo from "../../images/done.svg";
import OrderDetailsStyles from "./order-details.module.css";
import { orderSelector } from "../../services/selectors";
import { useSelector } from '../../services/types/hooks';

export default function OrderDetails() {
    const { orderNumber } = useSelector(orderSelector);

    return (
        <>
            <p className={`${OrderDetailsStyles.orderNumber} text text_type_digits-large pt-5`}>
                {orderNumber}
            </p>
            <p className="text text_type_main-default p-5">
                идентификатор заказа
            </p>
            <img src={DoneLogo} alt="Success" className="pt-4 pb-8" />
            <p className="text text text_type_main-small p-2">
                Ваш заказа начали готовить
            </p>
            <p className="text text_type_main-small text_color_inactive p-1">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );
}