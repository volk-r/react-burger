import React from 'react';
import AppStyles from './app.module.css';

import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

;
// import BurgerIngredients from '@ya.praktikum/react-developer-burger-ui-components';

class App extends React.Component {
    render() {
        return (
            <>
                <AppHeader />
                <main className={ AppStyles.box }>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </>
        );
    }
}

export default App;