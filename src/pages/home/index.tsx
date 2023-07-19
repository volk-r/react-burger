import React from "react";
import { hasErrorIngredientsSelector, isLoadingIngredientsSelector } from "../../services/selectors";
import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector } from '../../services/types/hooks';
import { Preload } from "../../components/preload";

export default function HomePage() {
    const isLoading = useSelector<boolean>(isLoadingIngredientsSelector);
    const hasError = useSelector<boolean>(hasErrorIngredientsSelector);

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
            {isLoading === true && <Preload/>}
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