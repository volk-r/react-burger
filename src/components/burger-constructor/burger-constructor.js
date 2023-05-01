import React from 'react';
import PropTypes from 'prop-types';

import BurgerConstructorStyles from './burger-constructor.module.css'

import {
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor(props) {
    return (
        <section className={ BurgerConstructorStyles.container }>
            <p className="m-20"></p>
            <ul>
                <li className={` ${ BurgerConstructorStyles.listItem } pl-59 mr-4 mb-1`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={1255}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
            </ul>
            <ul className={` ${ BurgerConstructorStyles.listContainer } custom-scroll m-1 pr-5`}>
                <li className={ BurgerConstructorStyles.listItem }>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text="Биокотлета из марсианской Магнолии"
                        price={424}
                        thumbnail={'https://code.s3.yandex.net/react/code/meat-01.png'}
                    />
                </li>
                <li className={ BurgerConstructorStyles.listItem }>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text="Плоды Фалленианского дерева"
                        price={874}
                        thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'}
                    />
                </li>
                <li className={ BurgerConstructorStyles.listItem }>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text="Соус Spicy-X"
                        price={424}
                        thumbnail={"https://code.s3.yandex.net/react/code/sauce-02.png"}
                    />
                </li>
                <li className={ BurgerConstructorStyles.listItem }>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text="Соус Spicy-X"
                        price={424}
                        thumbnail={"https://code.s3.yandex.net/react/code/sauce-02.png"}
                    />
                </li>
                <li className={ BurgerConstructorStyles.listItem }>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text="Биокотлета из марсианской Магнолии"
                        price={424}
                        thumbnail={'https://code.s3.yandex.net/react/code/meat-01.png'}
                    />
                </li>
            </ul>
            <ul>
                <li className={` ${ BurgerConstructorStyles.listItem } pl-59 mr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={1255}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
            </ul>
            <section className={` ${ BurgerConstructorStyles.priceContainer } mt-7 mr-4 mb-5`}>
                <p className="text text_type_digits-medium">
                    12345670
                </p>
                <p className="ml-2 mr-4 text text_type_main-large">
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
}

// BurgerConstructor.propTypes = {
//     _id: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     isLocked: PropTypes.bool.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     thumbnail: PropTypes.string.isRequired,
// };