import React from 'react';
import IngredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/selectors";

import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from "../../utils/constants";
import { TIngredient } from "../../utils/types";

export default function IngredientDetails() {
    const navigate = useNavigate();
    const { ingredientid } = useParams();
    const ingredients: Array<TIngredient> | [] = useSelector(ingredientsSelector);
    const selectedItem: TIngredient | undefined = ingredients.find(({ _id }) => _id === ingredientid)

    if (!selectedItem) {
        navigate( ROUTES.ROUTE_HOME_PAGE , { replace: true })
        return null;
    }

    return (
        <>
            <Link
                key={ selectedItem._id }
                to={{ pathname: `/ingredients/${selectedItem._id}` }}
                replace={ true }
                className={ IngredientDetailsStyles.isDisabled }
            >
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
            </Link>
        </>
    );
}