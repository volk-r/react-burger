import React from 'react';
import IngredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";

export default function IngredientDetails({selectedItem}) {
    return (
        <>
            <img src={selectedItem.image_large} alt={selectedItem.name} />
            <p className="text text_type_main-medium m-1 pb-2">
                {selectedItem.name}
            </p>
            <div className={ IngredientDetailsStyles.list }>
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
        </>
    );
}