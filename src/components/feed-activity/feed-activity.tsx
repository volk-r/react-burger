import React, { useMemo, useCallback } from 'react';
import Styles from './feed-activity.module.css'
import { useDispatch, useSelector } from '../../services/types/hooks';

export default function FeedActivity(props: any) { // TODO
    const { orders, total, totalToday } = props;

    let temArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11 ,12, 13 ,14 ,15 ,16,17 ,18 ,19 ,20 ,21, 22];// todo

    return (
        <section className={ Styles.container }>
            <p className="p-1 mt-10 mb-3 text text_type_main-large"></p>
            <section className={` ${ Styles.listContainer } mt-7`}>
                <div className={` ${ Styles.feedContainer } mr-4`}>
                    <p className={` ${ Styles.sticky } text text_type_main-medium mb-3`}>Готовы:</p>
                    <div className={` ${ Styles.feedContainerList } mr-4`}>
                        {temArray.map((item) => {
                            return <p className={`${ Styles.doneOrder } text text_type_digits-default`}>
                                {total}
                            </p>
                        })}
                    </div>
                </div>
                <div className={` ${ Styles.feedContainer }`}>
                    <p className={` ${ Styles.sticky } text text_type_main-medium mb-3`}>В работе:</p>
                    <div className={` ${ Styles.feedContainerList } mr-4`}>
                        {temArray.map((item) => {
                            return <p className={`text text_type_digits-default`}>
                                {totalToday}
                            </p>
                        })}
                    </div>
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