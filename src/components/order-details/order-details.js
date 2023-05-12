import React from 'react';

import DoneLogo from "../../images/done.svg";

export default function OrderDetails({orderNumber}) {
    return (
        <>
            <p className="text text_type_digits-large">
                {orderNumber}
            </p>
            <p className="text text_type_main-medium p-1">
                идентификатор заказа
            </p>
            <img src={DoneLogo} alt="Success" />
            <p className="text text_type_main-default p-2">
                Ваш заказа начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive p-1">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );
}