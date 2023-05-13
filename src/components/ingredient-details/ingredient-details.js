import React from 'react';
import IngredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";
import { ingredientAttributes } from "../../utils/ingredient-attributes";

export default function IngredientDetails({selectedItem}) {
    return (
        <>
            <img src={selectedItem.image_large} alt={selectedItem.name} className={ IngredientDetailsStyles.img } />
            <p className="text text_type_main-medium m-1 p-5 pb-10">
                {selectedItem.name}
            </p>
            <div className={ IngredientDetailsStyles.list }>
                <p className="text text_type_main-small text_color_inactive">
                    Калории,ккал
                    <p className="m-2 text_type_main-default">{selectedItem.calories}</p>
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Белки, г
                    <p className="m-2 text_type_main-default">{selectedItem.proteins}</p>
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Жиры, г
                    <p className="m-2 text_type_main-default">{selectedItem.fat}</p>
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Углеводы, г
                    <p className="m-2 text_type_main-default">{selectedItem.carbohydrates}</p>
                </p>
            </div>
        </>
    );
}

IngredientDetails.propTypes = {
    selectedItem: ingredientAttributes.isRequired,
};