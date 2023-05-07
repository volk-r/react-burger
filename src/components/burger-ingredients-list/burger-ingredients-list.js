import React, {useState, useEffect} from 'react';
import { ingredientAttributes } from "../../utils/ingredient-attributes";

import BurgerIngredientsListStyles from './burger-ingredients-list.module.css'

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import Modal from "../modal/modal";

export default function BurgerIngredientsList(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        console.log(item);
        console.log("[BurgerIngredientsList]: open ingredient details");
        setSelectedItem(item);
        setShowModal(true);
        console.log("[BurgerIngredientsList]: isModalOpen " + showModal);
    };

    const handleCloseModal = () => {
        console.log("[BurgerIngredientsList]: Close modal");
        setShowModal(false);
        console.log("[BurgerIngredientsList]: isModalOpen " + showModal);
    };

    //
    useEffect(() => {
        if (showModal === true) {
            console.log("[useEffect]: open modal");
            setShowModal(showModal);
            setSelectedItem(selectedItem);
        } else {
            console.log("[useEffect]: close modal");
            setShowModal(false);
            setSelectedItem(null);
        }
    }, [selectedItem, showModal])
    //

    return (
        <li>
            <p id={props.id} className="text text_type_main-medium">
                {props.title}
            </p>
            <div className={ BurgerIngredientsListStyles.containerBox }>
                {props.list.map((item) =>
                    <div key={item._id} className={`${ BurgerIngredientsListStyles.box } pb-6`} onClick={ () => handleItemClick(item) }>
                        {
                            item.__v === 0
                            ? <div className={ BurgerIngredientsListStyles.default }></div>
                            : <Counter count={ item.__v } size="default" extraClass={`${ BurgerIngredientsListStyles.count }`} />
                        }
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
                        {showModal && selectedItem && (
                            <Modal header="Детали ингредиента" show={ showModal } onClose={ handleCloseModal } >
                                <img src={selectedItem.image_large} alt={selectedItem.name} />
                                <p className="text text_type_main-medium m-1 pb-2">
                                    {selectedItem.name}
                                </p>
                                <div className={ BurgerIngredientsListStyles.list }>
                                    <p className="text text_type_main-default text_color_inactive">
                                        Калории,ккал
                                        <br/>
                                        {selectedItem.calories}
                                    </p>
                                    <p className="text text_type_main-default text_color_inactive">
                                        Белки, г
                                        <br/>
                                        {selectedItem.proteins}
                                    </p>
                                    <p className="text text_type_main-default text_color_inactive">
                                        Жиры, г
                                        <br/>
                                        {selectedItem.fat}
                                    </p>
                                    <p className="text text_type_main-default text_color_inactive">
                                        Углеводы, г
                                        <br/>
                                        {selectedItem.carbohydrates}
                                    </p>
                                </div>
                            </Modal>
                        )}
                    </div>
                )
                }
            </div>
        </li>
    );
}

BurgerIngredientsList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(ingredientAttributes).isRequired,
};