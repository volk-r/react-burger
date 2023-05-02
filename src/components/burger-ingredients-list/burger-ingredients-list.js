import React from 'react';
import { burgerAttributes } from "../../utils/burger-attributes";

import BurgerIngredientsListStyles from './burger-ingredients-list.module.css'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

export default function BurgerIngredientsList(props) {
    return (
        <li>
            <p id={props.id} className="text text_type_main-medium pb-4">
                {props.title}
            </p>
            <div className={ BurgerIngredientsListStyles.containerBox }>
                {props.list.map((item, index) =>
                    <div key={index} className={ BurgerIngredientsListStyles.box }>
                        <img src={item.image} alt={item.name}/>
                        <div className={ BurgerIngredientsListStyles.priceContainer }>
                            <p className="text text_type_digits-default pr-1">
                                {item.price}
                            </p>
                            <CurrencyIcon type={"primary"}/>
                        </div>
                        <p className="text text_type_main-small">
                            {item.name}
                        </p>
                    </div>
                )}
            </div>
        </li>
    );
}

BurgerIngredientsList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.exact(burgerAttributes).isRequired,
};