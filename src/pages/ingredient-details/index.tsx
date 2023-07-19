import React from 'react';
import Styles from "./ingredient-details.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export default function IngredientDetailsPage() {
    return (
        <div className={ Styles.content }>
            <h3 className={`${Styles.header} text text_type_main-large m-2 pr-2 pt-1`}>Детали ингредиента</h3>
            <IngredientDetails/>
        </div>
    );
}