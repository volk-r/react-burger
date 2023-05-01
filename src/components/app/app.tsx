import React from 'react';
import AppStyles from './app.module.css';

import AppHeader from '../header/header'
import { data } from '../../utils/data';

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

export default function App() {
    return (
        <>
            <AppHeader />
            <main className={ AppStyles.box }>
                <BurgerIngredients data={data} />
                <BurgerConstructor />
            </main>
        </>
    );
}