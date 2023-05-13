import React from 'react';

import DoneLogo from "../../images/done.svg";
import PropTypes from "prop-types";

export default function OrderDetails({orderNumber}) {
    return (
        <>
            <p className="text text_type_digits-large pt-5">
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

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired,
};