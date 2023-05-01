import React from 'react';

import BurgerIngredientsStyles from './burger-ingredients.module.css'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one')

    // state = {
    //     current: 'sause',
    //     data: data,
    // };
    // getTypes = () => {
    //     return this.state.data.map(el => el.type)
    // };

    return (
        <>
            <section className={ BurgerIngredientsStyles.container }>
                <p className="p-1 mt-10 mb-3 text text_type_main-large">
                    Соберите бургер
                </p>
                <div style={{ display: 'flex' }}>
                    <Tab value="sause" active={current === 'sause'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинка
                    </Tab>
                </div>
                <p className="text text_type_main-medium mb-5">
                </p>
                <ul className={` ${ BurgerIngredientsStyles.listContainer } custom-scroll`}>
                    <li>
                        <p className="text text_type_main-medium">
                            Булки
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                        <p className="text text_type_main-large p-5">
                            ingridients
                        </p>
                    </li>
                </ul>
            </section>
        </>
    );
}