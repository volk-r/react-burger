import React, { useState, useEffect } from 'react';
import AppStyles from './app.module.css';
import { DATA_URL } from '../../utils/constants';

import AppHeader from '../header/header'
import ErrorBoundary from '../error-boundary/error-boundary'

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

export default function App() {
    const [state, setState] = useState({
        ingredients: [],
        isLoading: true,
        hasError: false
    })

    useEffect(() => {
        const getProducts = () => {
            setState({ ...state, hasError: false, isLoading: true });

            fetch(DATA_URL)
                .then(res => res.json())
                .then(data => setState({ ...state, ingredients: data.data, isLoading: false }))
                .catch(e => {
                    setState({ ...state, hasError: true, isLoading: false });
            });
        }

        getProducts()
    }, [])

    return (
        <>
            <AppHeader />
            {state.isLoading && <p className={ AppStyles.loading }>Loading...</p>}
            <ErrorBoundary>
                <main className={ AppStyles.box }>
                        {
                            !state.isLoading
                            && !state.hasError
                            && <>
                                <BurgerIngredients data={ state.ingredients } />
                                <BurgerConstructor burgerIngridients={ state.ingredients } />
                            </>
                        }
                </main>
            </ErrorBoundary>
        </>
    );
}