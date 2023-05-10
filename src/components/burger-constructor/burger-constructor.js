import React, {useState, useMemo, useCallback, useContext} from 'react';
import DoneLogo from '../../images/done.svg';
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

export default function BurgerConstructor() {
    const burgerIngridients = useContext(IngredientsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const bun = burgerIngridients.find(element => element.type === BUN_TYPE);//todo: temporarily gag

    const [orderNumber, setorderNumber] = useState(null)
    const [hasError, setError] = useState(false);

    {/*todo: need to pass ingredients ids*/}

    const handleOpenModal = useCallback(
        () => {
            console.log();
            makeOrder().then(data => {
                setorderNumber(data);
                setError(false);
                setIsModalOpen(true);
            })
            .catch(e => {
                setError(true);
                setIsModalOpen(true);

                throw new Error(e);
            })
        }, []
    );

    const handleCloseModal = useCallback(
        () => {
            setIsModalOpen(false)
        }, []
    );

    const totalPrice = useMemo(
        () =>
            burgerIngridients.reduce((total, item) => {
                if (item.type !== bun.type) {
                    return total + item.price;
                }
                return total;
            }, 0) + bun.price * 2
        ,[bun, burgerIngridients]
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
                    burgerIngridients.map((item) =>
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

            {/*todo: need to pass ingredients ids*/}

            {isModalOpen === true &&
            <Modal header="" onClose={ handleCloseModal() } >
                {hasError === true && <ErrorBlock/>}
                {orderNumber !== null
                 && hasError === false && <>
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
                }
            </Modal>}
        </section>
    );
}