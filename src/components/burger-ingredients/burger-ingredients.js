import React, { useCallback } from 'react';
import { INGREDIENT_CATEGORIES, BUN_TYPE } from '../../utils/constants';

import BurgerIngredientsStyles from './burger-ingredients.module.css'

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import {useSelector} from "react-redux";
import {ingredientsSelector} from "../../services/selectors";

export default function BurgerIngredients() {
    const ingredients = useSelector(ingredientsSelector);
    const [current, setCurrent] = React.useState(BUN_TYPE)

    const getList = useCallback(
        (type) => {
        return ingredients.filter(ingridient => ( ingridient.type === type ))
    }, [ingredients]);

    return (
        <>
            <section className={ BurgerIngredientsStyles.container }>
                <p className="p-1 mt-10 mb-3 text text_type_main-large">
                    Соберите бургер
                </p>
                <div style={{ display: 'flex' }}>
                    {INGREDIENT_CATEGORIES.map((item, index) =>
                        <a key={index} href={`#${item.type}`}>
                            <Tab value={item.type} active={current === item.type} onClick={setCurrent}>
                                { item.name }
                            </Tab>
                        </a>
                    )}
                </div>
                <p className="text text_type_main-medium mb-5">
                </p>
                <ul className={` ${ BurgerIngredientsStyles.listContainer } custom-scroll`}>
                    {INGREDIENT_CATEGORIES.map((item, index) =>
                        <a key={index} href={`#${item.type}`}>
                            <BurgerIngredientsList title={ item.name } list={ getList(item.type) } id={ item.type } />
                        </a>
                    )}
                </ul>
            </section>
        </>
    );
}