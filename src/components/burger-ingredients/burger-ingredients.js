import React, {useEffect} from 'react';

import BurgerIngredientsStyles from './burger-ingredients.module.css'

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one')

    let [bun, setBun] = React.useState([])
    let [main, setMain] = React.useState([])
    let [sauce, setSauce] = React.useState([])

    useEffect(() => {
        setBun(getList('bun'));
        setSauce(getList('sauce'));
        setMain(getList('main'));
    }, [data])

    const getList = ((type) => {
        return data.filter(ingridient => ( ingridient.type === type ))
    });

    return (
        <>
            <section className={ BurgerIngredientsStyles.container }>
                <p className="p-1 mt-10 mb-3 text text_type_main-large">
                    Соберите бургер
                </p>
                <div style={{ display: 'flex' }}>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинка
                    </Tab>
                    <Tab value="sause" active={current === 'sause'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </div>
                <p className="text text_type_main-medium mb-5">
                </p>
                <ul className={` ${ BurgerIngredientsStyles.listContainer } custom-scroll`}>
                    <BurgerIngredientsList title={"Булки"} list={bun} />
                    <BurgerIngredientsList title={"Начинка"} list={main}/>
                    <BurgerIngredientsList title={"Соусы"} list={sauce} />
                </ul>
            </section>
        </>
    );
}