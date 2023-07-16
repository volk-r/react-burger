import React, { useEffect } from "react";
import { hasErrorIngredientsSelector, isLoadingIngredientsSelector } from "../../services/selectors";
import { getIngredientsList } from "../../services/thunk/burger-ingredients";
import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useDispatch, useSelector } from '../../services/types/hooks';

export default function HomePage() {
    const isLoading = useSelector<boolean>(isLoadingIngredientsSelector);
    const hasError = useSelector<boolean>(hasErrorIngredientsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientsList())
    }, [])

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
            {isLoading === true && <p className={ styles.loading }>Loading...</p>}
            {
                isLoading === false
                && hasError === true
                && <ErrorBlock />
            }
            <main className={ styles.box }>
                {
                    isLoading === false
                    && hasError === false
                    && <DndProvider backend={ HTML5Backend }>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                }
            </main>
        </>
    );
}