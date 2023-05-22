import React, { useEffect } from 'react';
import AppStyles from './app.module.css';

import AppHeader from '../header/header'
import ErrorBoundary from '../error-boundary/error-boundary'

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import { getIngredientsList } from '../../services/thunk/burger-ingredients';
import { useSelector, useDispatch } from 'react-redux';
import {
    hasErrorIngredientsSelector,
    isLoadingIngredientsSelector
} from "../../services/selectors";

export default function App() {
    const isLoading = useSelector(isLoadingIngredientsSelector);
    const hasError = useSelector(hasErrorIngredientsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        // TODO: tsx gap
        // @ts-ignore
        dispatch(getIngredientsList())
    }, [])

    const ErrorBlock = () => {
        return (
            <section className={ AppStyles.errorBlock }>
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
            {isLoading === true && <p className={ AppStyles.loading }>Loading...</p>}
            {
                isLoading === false
                && hasError === true
                && <ErrorBlock />
            }
            <ErrorBoundary>
                <main className={ AppStyles.box }>
                        {
                            isLoading === false
                            && hasError === false
                            && <>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </>
                        }
                </main>
            </ErrorBoundary>
        </>
    );
}