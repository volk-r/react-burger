import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    hasErrorIngredientsSelector,
    ingredientsSelector,
    isLoadingIngredientsSelector
} from "../../services/selectors";
import { useParams } from 'react-router-dom';
import AppHeader from "../../components/header/header";
import styles from "./ingredient-details.module.css";
import { getIngredientsList } from "../../services/thunk/burger-ingredients";

export default function IngredientDetailsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientsList())
    }, [])

    const ingredients = useSelector(ingredientsSelector);
    const isLoading = useSelector(isLoadingIngredientsSelector);
    const hasError = useSelector(hasErrorIngredientsSelector);

    const { ingredientid } = useParams();
    const selectedItem = ingredients.find(({ _id }) => _id === ingredientid)

    const ErrorBlock = () => {
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
            <AppHeader />
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