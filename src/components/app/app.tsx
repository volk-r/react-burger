import React, { useState, useEffect, useCallback } from 'react';
import AppStyles from './app.module.css';
import { getIngredients } from '../../utils/burger-api';

import AppHeader from '../header/header'
import ErrorBoundary from '../error-boundary/error-boundary'

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {IngredientsContext} from "../../contexts/ingredients-context";

export default function App() {
    const [ingredients, setIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setError] = useState(false);

    const getProducts = useCallback(() => {
        getIngredients().then(data => {
            setIsLoading(false);
            setIngredients(data);
        })
        .catch(e => {
            setError(true);
            setIsLoading(false);

            throw new Error(e);
        })
    }, [])

    useEffect(() => {
        getProducts()
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
                                <IngredientsContext.Provider value={ ingredients }>
                                    <BurgerIngredients />
                                    <BurgerConstructor />
                                </IngredientsContext.Provider>
                            </>
                        }
                </main>
            </ErrorBoundary>
        </>
    );
}