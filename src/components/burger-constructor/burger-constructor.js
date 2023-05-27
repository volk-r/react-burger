import React, {useMemo, useCallback } from 'react';
import Modal from "../modal/modal";
import {BUN_COUNT, BUN_TYPE} from "../../utils/constants";
import UnknownBun from "../../images/bun-unknown-large.png";
import WaitImage from "../../images/wait.gif";

import BurgerConstructorStyles from './burger-constructor.module.css'

import {
    ConstructorElement,
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { ITEM_TYPES } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { burgerConstructorIngredientsSelector, orderSelector } from "../../services/selectors";
import { getOrderNumber, resetOrderNumber } from "../../services/thunk/order-details";
import { addItemToConstructor } from "../../services/thunk/burger-constructor";
import { increaseIngrideintsCount } from "../../services/thunk/burger-ingredients";
import { changeIngrideintPosition } from "../../services/thunk/burger-constructor";
import { BurgerConstructorItem } from "../burger-constructor-item/burger-constructor-item";

export default function BurgerConstructor() {
    const { bun, ingredients, isDisabledOrderButton } = useSelector(burgerConstructorIngredientsSelector);
    const { hasError, isLoading } = useSelector(orderSelector);
    const dispatch = useDispatch();

    const { isModalOpen, openModal, closeModal } = useModal();

    const [{isHover}, dropTarget] = useDrop({
        accept: ITEM_TYPES.MOVE_ITEM_TO_CONSTRUCTOR,
        drop(item) {
            dispatch(addItemToConstructor(item))
            dispatch(increaseIngrideintsCount(item));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const borderColor = isHover ? 'lightgreen' : 'transparent';

    // sorting inside constructor
    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch(changeIngrideintPosition(dragIndex, hoverIndex))
    }, [dispatch]);

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
            dispatch(resetOrderNumber())
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
                <img src={ UnknownBun } alt="А это что за булка?" className={ BurgerConstructorStyles.img } />
            </section>
        );
    }

    const renderIngredient = useCallback((item, index) => {
        return (
            <li
                key={ item.uuid }
                className={ BurgerConstructorStyles.listItem }
            >
                <BurgerConstructorItem
                    key={ item.uuid }
                    index={ index }
                    burgerConstructorItem={item}
                    moveIngredient={moveIngredient}
                />
            </li>
        )
    }, [])

    return (
        <section ref={dropTarget} className={ BurgerConstructorStyles.container } style={{ borderColor }}>
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
                        <li className={` ${ BurgerConstructorStyles.listItem } ml-6 mr-2`}>
                            Просто добавь воды
                        </li>
                    : ingredients.map((item, index) => renderIngredient(item, index))
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
                    {totalPrice.toString()}
                </p>
                <p className="ml-2 mr-4 text text_type_main-large">
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={ handleOpenModal } disabled={!isDisabledOrderButton}>
                    Оформить заказ
                </Button>
            </section>
            {
                isModalOpen === true &&
                <Modal header="" onClose={ handleCloseModal } >
                    {
                        isLoading === true
                        && hasError === false
                        && <img src={ WaitImage } alt="Loading.." className={ BurgerConstructorStyles.loading } />
                    }
                    {
                        isLoading === false
                        && (hasError === true ? <ErrorBlock/> : <OrderDetails />)
                    }
                </Modal>
            }
        </section>
    );
}