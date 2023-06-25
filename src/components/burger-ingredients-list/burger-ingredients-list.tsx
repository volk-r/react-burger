import React, { ReactElement, FC } from 'react';

import BurgerIngredientsListStyles from './burger-ingredients-list.module.css'

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ITEM_TYPES } from "../../utils/constants";
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import IngredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";
import { IBurgerIngredientsList } from "../../utils/interfaces";
import { TListItem } from "../../utils/types";

export default function BurgerIngredientsList(props: IBurgerIngredientsList) {
    const location = useLocation();
    const { id, title, list } = props;

    const ListItem: FC<TListItem> = React.memo(({ item }): ReactElement => {
        const [, dragRef] = useDrag({
            type: ITEM_TYPES.MOVE_ITEM_TO_CONSTRUCTOR,
            item: item
        });

        return (
            <Link
                key={ item._id }
                to={`/ingredients/${ item._id }`}
                state={{ background: location }}
                className={ IngredientDetailsStyles.isDisabled }
            >
                <div ref={ dragRef } key={ item._id } className={`${ BurgerIngredientsListStyles.box } pb-6`}>
                    {
                        typeof item.qty === 'undefined' || item.qty === 0
                            ? <div className={ BurgerIngredientsListStyles.default }></div>
                            : <Counter count={ item.qty } size="default" extraClass={`${ BurgerIngredientsListStyles.count }`} />
                    }
                    <img src={ item.image } alt={ item.name }/>
                    <div className={ BurgerIngredientsListStyles.priceContainer }>
                        <p className="text text_type_digits-default pr-1">
                            { item.price }
                        </p>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                    <p className="text text_type_main-small">
                        { item.name }
                    </p>
                </div>
            </Link>
        );
    });

    return (
        <li>
            <p id={id} className="text text_type_main-medium">
                {title}
            </p>
            <div className={ BurgerIngredientsListStyles.containerBox }>
                {
                    list.map((item) =>
                        <ListItem key={ item._id } item={item} />
                    )
                }
            </div>
        </li>
    );
}