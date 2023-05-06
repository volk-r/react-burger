import React, {useState} from 'react';
import { ingredientAttributes } from "../../utils/ingredient-attributes";

import BurgerIngredientsListStyles from './burger-ingredients-list.module.css'

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import DoneLogo from "../../images/done.svg";

export default function BurgerIngredientsList(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        console.log("Open ingredient details");
        setIsModalOpen(true);
    };

    return (
        <li>
            <p id={props.id} className="text text_type_main-medium">
                {props.title}
            </p>
            <div className={ BurgerIngredientsListStyles.containerBox } onClick={ handleOpenModal }>
                {props.list.map((item, index) =>
                    <div key={index} className={`${ BurgerIngredientsListStyles.box } pb-6`}>
                        {
                            item.__v === 0
                            ? <div className={BurgerIngredientsListStyles.default}></div>
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
                    </div>
                )
                }
                {/*TODO*/}
                {/*{isModalOpen*/}
                {/* && <Modal header="Детали ингредиента" show={ isModalOpen } onClose={() => setIsModalOpen(false)} >*/}
                {/*     <img src={props.list[0].image_large} alt={props.list[0].name} />*/}
                {/*     <p className="text text_type_main-medium m-1">*/}
                {/*         {props.list[0].name}*/}
                {/*     </p>*/}
                {/*     <p className="text text_type_main-default text_color_inactive">*/}
                {/*         белки жиры углеводы*/}
                {/*     </p>*/}
                {/* </Modal>}*/}
            </div>
        </li>
    );
}

BurgerIngredientsList.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(ingredientAttributes).isRequired,
};