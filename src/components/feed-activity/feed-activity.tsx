import React, { useMemo, useCallback } from 'react';
import Styles from './feed-activity.module.css'
import { TConstructorIngredient } from "../../utils/types";
import { useDispatch, useSelector } from '../../services/types/hooks';

export default function FeedActivity(props: any) { // TODO
    const { orders, total, totalToday } = props;

    return (
        <section className={ Styles.container }>
            <p className="p-1 mt-10 mb-3 text text_type_main-large"></p>
            <section className={` ${ Styles.listContainer } mt-7`}>
                <div className={` ${ Styles.feedContainer } mr-4 custom-scroll`}>
                    <p className={` ${ Styles.sticky } text text_type_main-medium mb-3`}>Готовы:</p>
                    {[2, 3, 4, 5, 35].map(() => {
                        return <p className={`${ Styles.doneOrder } text text_type_digits-default`}>
                            {total}
                        </p>
                    })}
                </div>
                <div className={` ${ Styles.feedContainer } custom-scroll`}>
                    <p className={` ${ Styles.sticky } text text_type_main-medium mb-3`}>В работе:</p>
                    {[2, 3, 4, 5, 35].map(() => {
                        return <p className={`text text_type_digits-default`}>
                            {totalToday}
                        </p>
                    })}
                </div>
            </section>
            <section className={` ${ Styles.priceContainer }`}>
                <p className="p-1 mt-9 text text_type_main-medium">Выполнено за все время:</p>
                <p className={` ${ Styles.shadow } text text_type_digits-large`}>
                    {total}
                </p>
                <p className="p-1 mt-7 text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={` ${ Styles.shadow } text text_type_digits-large`}>
                    {totalToday}
                </p>
            </section>
        </section>
    );
}