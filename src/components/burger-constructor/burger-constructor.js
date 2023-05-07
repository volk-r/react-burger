import React, {useEffect, useState} from 'react';
import { ingredientAttributes } from '../../utils/ingredient-attributes';
import DoneLogo from '../../images/done.svg';
import Modal from "../modal/modal";

import BurgerConstructorStyles from './burger-constructor.module.css'

import {
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

export default function BurgerConstructor(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const bun = props.burgerIngridients[0];

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false)
    };

    useEffect(() => {
        const getTotalPrice = () => {
            setTotalPrice(props.burgerIngridients.reduce((total, item) => {
                if (item.type !== bun.type) {
                    return total + item.price;
                }
                return total;
            }, 0) + bun.price);
        }

        getTotalPrice()
    }, [bun, props.burgerIngridients])

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
                    props.burgerIngridients.map((item) =>
                        item.type !== bun.type
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
            <Modal header="" show={ isModalOpen } onClose={ handleCloseModal } >
                <p className="text text_type_digits-large">
                    {totalPrice}
                </p>
                <p className="text text_type_main-medium p-1">
                    идентификатора заказа
                </p>
                <img src={DoneLogo} alt="Success" />
                <p className="text text_type_main-default p-2">
                    Ваш заказа начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive p-1">
                    Дождитесь готовности на орбитальной станции
                </p>
            </Modal>
        </section>
    );
}

BurgerConstructor.propTypes = {
    burgerIngridients: PropTypes.arrayOf(ingredientAttributes).isRequired,
};