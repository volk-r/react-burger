import React, { useState, useMemo, useCallback } from 'react';
import { ingredientAttributes } from "../../utils/ingredient-attributes";

import BurgerIngredientsListStyles from './burger-ingredients-list.module.css'

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function BurgerIngredientsList(props) {
    const [selectedItem, setSelectedItem] = useState(null);
    const { id, title, list } = props;

    const handleItemClick = useCallback(
        (item) => {
            setSelectedItem(item);
        },
        []
    );

    const handleCloseModal = useCallback(
        () => {
            setSelectedItem(null);
        },
        []
    );

    const isModalVisible = useMemo(() => selectedItem !== null, [selectedItem]);

    const ListItem = React.memo(({ item, handleItemClick }) => {
        const handleClick = () => handleItemClick(item);

        return (
            <div key={ item._id } className={`${ BurgerIngredientsListStyles.box } pb-6`} onClick={ handleClick }>
                {
                    item.__v === 0
                        ? <div className={ BurgerIngredientsListStyles.default }></div>
                        : <Counter count={ item.__v } size="default" extraClass={`${ BurgerIngredientsListStyles.count }`} />
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
                        <ListItem key={ item._id } item={item} handleItemClick={handleItemClick} />
                    )
                }
            </div>
            {isModalVisible === true && (
                <Modal header="Детали ингредиента" onClose={ handleCloseModal } >
                    <IngredientDetails selectedItem={selectedItem} />
                </Modal>
            )}
        </li>
    );
}

BurgerIngredientsList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(ingredientAttributes).isRequired,
};