import React, { ReactElement } from 'react';
import { useSelector } from '../../services/types/hooks';
import {
    hasErrorIngredientsSelector,
    ingredientsSelector,
    isLoadingIngredientsSelector
} from "../../services/selectors";
import { useParams } from 'react-router-dom';
import styles from "./ingredient-details.module.css";
import { TIngredient } from "../../utils/types";


export default function IngredientDetailsPage() {
    const ingredients: Array<TIngredient> | [] = useSelector(ingredientsSelector);
    const isLoading = useSelector<boolean>(isLoadingIngredientsSelector);
    const hasError = useSelector<boolean>(hasErrorIngredientsSelector);

    const { ingredientId } = useParams();
    const selectedItem: TIngredient | undefined = ingredients.find(({ _id }) => _id === ingredientId)

    const ErrorBlock = (): ReactElement => {
        return (
            <section className={ styles.errorBlock }>
                <h1>Что-то пошло не так :(</h1>
                <p>
                    Ошибка загрузки данных. Пожалуйста, перезагрузите страницу или попробуйте позже.
                </p>
            </section>
        );
    }

    return (
        <>
            {isLoading === true && <p className={ styles.loading }>Loading...</p>}
            {
                isLoading === false
                && hasError === true
                && <ErrorBlock />
            }
            {isLoading === false
             && hasError === false
             && selectedItem
             &&
            <div className={ styles.content }>
                <h3 className={`${styles.header} text text_type_main-large m-2 pr-2 pt-1`}>Детали ингредиента</h3>
                <img src={selectedItem.image_large} alt={selectedItem.name} className={ styles.img } />
                <p className="text text_type_main-medium m-1 p-5 pb-10">
                    {selectedItem.name}
                </p>
                <div className={ styles.list }>
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
            </div>}
        </>
    );
}