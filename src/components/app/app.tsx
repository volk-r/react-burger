import React, { useState, useEffect } from 'react';
import AppStyles from './app.module.css';
import { DATA_URL } from '../../utils/constants';

import AppHeader from '../header/header'
import ErrorBoundary from '../error-boundary/error-boundary'

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

export default function App() {
    const [ingredients, setIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setError] = useState(false);

    useEffect(() => {
        const getProducts = () => {
            fetch(DATA_URL)
                .then(res => res.json())
                .then(data => {
                    setIsLoading(false);
                    setIngredients(data.data);
                })
                .catch(e => {
                    setError(true);
                    setIsLoading(false);
            });
        }

        getProducts()
    }, [])

    return (
        <>
            <AppHeader />
            {isLoading === true && <p className={ AppStyles.loading }>Loading...</p>}
            <ErrorBoundary>
                <main className={ AppStyles.box }>
                        {
                            isLoading === false
                            && hasError === false
                            && <>
                                <BurgerIngredients burgerIngridients={ ingredients } />
                                <BurgerConstructor burgerIngridients={ ingredients } />
                            </>
                        }
                </main>
            </ErrorBoundary>
        </>
    );
}