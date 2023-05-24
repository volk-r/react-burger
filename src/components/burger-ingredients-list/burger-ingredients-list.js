import React, { useCallback } from 'react';
import { ingredientAttributes } from "../../utils/ingredient-attributes";

import BurgerIngredientsListStyles from './burger-ingredients-list.module.css'

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { setIngredientDetails, resetIngredientDetails } from "../../services/thunk/ingredient-details";
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";

export default function BurgerIngredientsList(props) {
    const dispatch = useDispatch();
    const { isModalOpen, openModal, closeModal } = useModal();
    const { id, title, list } = props;

    const handleItemClick = useCallback(
        (item) => {
            openModal()
            dispatch(setIngredientDetails(item));
        },
        []
    );

    const handleCloseModal = useCallback(
        () => {
            closeModal()
            dispatch(resetIngredientDetails());
        },
        []
    );

    const ListItem = React.memo(({ item, handleItemClick }) => {
        const handleClick = () => handleItemClick(item);

        const [, dragRef] = useDrag({
            type: "ingredient",
            item: item
        });

        return (
            <div ref={dragRef} key={ item._id } className={`${ BurgerIngredientsListStyles.box } pb-6`} onClick={ handleClick }>
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
            {isModalOpen === true && (
                <Modal header="Детали ингредиента" onClose={ handleCloseModal } >
                    <IngredientDetails />
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