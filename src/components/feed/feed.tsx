import React from 'react';
import { INGREDIENT_CATEGORIES } from '../../utils/constants';
import Styles from './feed.module.css'

import { useSelector } from '../../services/types/hooks';

export default function Feed() {

    return (
        <>
            <section className={ Styles.container }>
                <p className="p-1 mt-7 mb-3 text text_type_main-large">
                    Лента заказов
                </p>
                {/*<div style={{ display: 'flex' }}>*/}
                {/*    /!*{INGREDIENT_CATEGORIES.map((item, index) =>*!/*/}
                {/*    /!*    <a key={item.type} href={`#${item.type}`} id={`tab_${item.type}`} data-tab={item.type} >*!/*/}
                {/*    /!*    </a>*!/*/}
                {/*    /!*)}*!/*/}
                {/*</div>*/}
                {/*<p className="text text_type_main-medium mb-5">*/}
                {/*</p>*/}
                <ul className={` ${ Styles.listContainer } custom-scroll`}>
                    {INGREDIENT_CATEGORIES.map((item) =>
                        <section key={item.type}>
                            {/*<BurgerIngredientsList title={ item.name } list={ getList(item.type) } id={`section_${item.type}`} />*/}
                        </section>
                    )}
                </ul>
            </section>
        </>
    );
}