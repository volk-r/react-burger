import React from 'react';
import IngredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";
import {useSelector} from "react-redux";
import {selectedItemSelector} from "../../services/selectors";

export default function IngredientDetails() {
    const selectedItem = useSelector(selectedItemSelector);

    return (
        <>
            <img src={selectedItem.image_large} alt={selectedItem.name} className={ IngredientDetailsStyles.img } />
            <p className="text text_type_main-medium m-1 p-5 pb-10">
                {selectedItem.name}
            </p>
            <div className={ IngredientDetailsStyles.list }>
                <div className="text text_type_main-small text_color_inactive">
                    Калории,ккал
                    <p className="m-2 text_type_main-default">{selectedItem.calories}</p>
                </div>
                <div className="text text_type_main-small text_color_inactive">
                    Белки, г
                    <p className="m-2 text_type_main-default">{selectedItem.proteins}</p>
                </div>
                <div className="text text_type_main-small text_color_inactive">
                    Жиры, г
                    <p className="m-2 text_type_main-default">{selectedItem.fat}</p>
                </div>
                <div className="text text_type_main-small text_color_inactive">
                    Углеводы, г
                    <p className="m-2 text_type_main-default">{selectedItem.carbohydrates}</p>
                </div>
            </div>
        </>
    );
}