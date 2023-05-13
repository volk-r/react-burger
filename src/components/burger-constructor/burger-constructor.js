import React, {useState, useMemo, useCallback, useContext} from 'react';
import Modal from "../modal/modal";
import { BUN_TYPE } from "../../utils/constants";

import BurgerConstructorStyles from './burger-constructor.module.css'

import {
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientsContext } from "../../contexts/ingredients-context";
import { makeOrder } from "../../utils/burger-api";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { OrderContext } from "../../contexts/order-context";

export default function BurgerConstructor() {
    const { bun, ingredients } = useContext(IngredientsContext);
    const { isModalOpen, openModal, closeModal } = useModal();
    const [ order, setOrder ] = useContext(OrderContext);

    const [hasError, setError] = useState(false);

    const handleOpenModal = () => {
        const ids = [...ingredients
          .filter(item => item.type !== BUN_TYPE)
          .map(item => item._id),
          bun._id
        ];

        makeOrder(ids).then(data => {
            setOrder({ orderNumber: data });
            setError(false);
            openModal();
        })
        .catch(e => {
            setError(true);
            openModal();
        })
    };

    const handleCloseModal = useCallback(
        () => {
            closeModal()
        }, []
    );

    const totalPrice = useMemo(
        () =>
            ingredients.reduce((total, item) => {
                if (item.type !== BUN_TYPE) {
                    return total + item.price;
                }
                return total;
            }, 0) + bun.price * 2
        ,[bun, ingredients]
    );

    const ErrorBlock = () => {
        return (
            <section className={ BurgerConstructorStyles.errorBlock }>
                <h1>Что-то пошло не так :(</h1>
                <p>
                    Ваш заказ потерялся в дороге. Попробуйте поискать официанта.
                </p>
            </section>
        );
    }

    return (
        <section className={ BurgerConstructorStyles.container }>
            <p className="m-20"></p>
            <ul>
                <li className={` ${ BurgerConstructorStyles.listItem } pl-59 mr-4 mb-1`}>
                    <ConstructorElement
                        type="top"
                        isLocked={ true }
                        text={`${ bun.name } (верх)`}
                        price={ bun.price }
                        thumbnail={ bun.image }
                    />
                </li>
            </ul>
            <ul className={` ${ BurgerConstructorStyles.listContainer } custom-scroll m-1 pr-5`}>
                {
                    ingredients.map((item) =>
                        item.type !== BUN_TYPE
                        && <li key={ item._id } className={ BurgerConstructorStyles.listItem }>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ item.name }
                                price={ item.price }
                                thumbnail={ item.image }
                            />
                        </li>
                    )
                }
            </ul>
            <ul>
                <li className={` ${ BurgerConstructorStyles.listItem } pl-59 mr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ bun.name } (низ)`}
                        price={ bun.price }
                        thumbnail={ bun.image }
                    />
                </li>
            </ul>
            <section className={` ${ BurgerConstructorStyles.priceContainer } mt-7 mr-4 mb-5`}>
                <p className="text text_type_digits-medium">
                    {totalPrice}
                </p>
                <p className="ml-2 mr-4 text text_type_main-large">
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={ handleOpenModal }>
                    Оформить заказ
                </Button>
            </section>
            {isModalOpen === true &&
            <Modal header="" onClose={ handleCloseModal } >
                {hasError === true && <ErrorBlock/>}
                {order.orderNumber !== null
                 && hasError === false
                 && <OrderDetails orderNumber={order.orderNumber} />
                }
            </Modal>}
        </section>
    );
}