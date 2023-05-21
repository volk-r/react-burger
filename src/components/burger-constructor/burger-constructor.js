import React, { useMemo, useCallback } from 'react';
import Modal from "../modal/modal";
import {BUN_COUNT, BUN_TYPE} from "../../utils/constants";
import UnknownBun from "../../images/bun-unknown-large.png";

import BurgerConstructorStyles from './burger-constructor.module.css'

import {
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { burgerConstructorIngredientsSelector, orderSelector } from "../../services/selectors";
import { getOrderNumber } from "../../services/thunk/order-details";
import { burgerIngredientsSelector } from "../../services/selectors";

export default function BurgerConstructor() {
    // const { bun, ingredients } = useSelector(burgerConstructorIngredientsSelector);// TODO
    const { orderNumber, hasError } = useSelector(orderSelector);
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(burgerIngredientsSelector);// TODO

    const { isModalOpen, openModal, closeModal } = useModal();

    const handleOpenModal = () => {
        const ids = [...ingredients
          .filter(item => item.type !== BUN_TYPE)
          .map(item => item._id),
          bun._id
        ];

        dispatch(getOrderNumber(ids))
        openModal();
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
            }, 0) + bun.price * BUN_COUNT
        ,[bun, ingredients]
    );

    const ErrorBlock = () => {
        return (
            <section className={ BurgerConstructorStyles.errorBlock }>
                <h1 className="m-4 text text_type_main-large">Что-то пошло не так :(</h1>
                <p className="ml-2 mr-4 p-1 text text_type_main-medium">
                    Возможно, вы забыли выбрать булочку или Ваш заказ потерялся в дороге. Попробуйте еще раз или позовите официанта.
                </p>
                <img src={UnknownBun} alt="А это что за булка?" className={ BurgerConstructorStyles.img } />
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
                    ingredients.length === 0
                        ?
                        <li className={ BurgerConstructorStyles.listItem }>
                            Просто добавь воды
                        </li>
                    :
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
            {
                isModalOpen === true &&
                <Modal header="" onClose={ handleCloseModal } >
                    {hasError === true && <ErrorBlock/>}
                    {
                        orderNumber !== null
                        && hasError === false
                        && <OrderDetails orderNumber={orderNumber} />
                    }
                </Modal>
            }
        </section>
    );
}