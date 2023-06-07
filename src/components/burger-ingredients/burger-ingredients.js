import React, { useCallback, useEffect } from 'react';
import { INGREDIENT_CATEGORIES, BUN_TYPE } from '../../utils/constants';

import BurgerIngredientsStyles from './burger-ingredients.module.css'

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/selectors";

export default function BurgerIngredients() {
    const ingredients = useSelector(ingredientsSelector);
    const [activeTab, setActiveTab] = React.useState(BUN_TYPE)

    const getList = useCallback(
        (type) => {
        return ingredients.filter(ingridient => ( ingridient.type === type ))
    }, [ingredients]);

    const onTabClick = (tab) => {
        setActiveTab(tab);
        const element = document.getElementById("section_" + tab);
        if (element) element.scrollIntoView({behavior: "smooth"});
    }

    const handleScroll = () => {
        const tabs = document.querySelectorAll('[id *= "tab_"]')
        const pages = document.querySelectorAll('[id *= "section"]')

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(pages).indexOf(entry.target)
                    setActiveTab(tabs[index].dataset.tab);
                }
            })
        }, {
            threshold: 1
        })

        pages.forEach(page => {
            observer.observe(page)
        })
    };

    useEffect(() => {
        const container = document.getElementById('ingredients-container');
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <section className={ BurgerIngredientsStyles.container }>
                <p className="p-1 mt-10 mb-3 text text_type_main-large">
                    Соберите бургер
                </p>
                <div style={{ display: 'flex' }}>
                    {INGREDIENT_CATEGORIES.map((item, index) =>
                        <a key={item.type} href={`#${item.type}`} id={`tab_${item.type}`} data-tab={item.type} >
                            <Tab value={item.type} active={activeTab === item.type} onClick={onTabClick}>
                                { item.name }
                            </Tab>
                        </a>
                    )}
                </div>
                <p className="text text_type_main-medium mb-5">
                </p>
                <ul id="ingredients-container" className={` ${ BurgerIngredientsStyles.listContainer } custom-scroll`}>
                    {INGREDIENT_CATEGORIES.map((item) =>
                        <section key={item.type}>
                            <BurgerIngredientsList title={ item.name } list={ getList(item.type) } id={`section_${item.type}`} />
                        </section>
                    )}
                </ul>
            </section>
        </>
    );
}