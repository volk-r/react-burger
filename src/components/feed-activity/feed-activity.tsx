import React from 'react';
import Styles from './feed-activity.module.css'
import { EOrderStatus, TOrder } from "../../utils/types";

export default function FeedActivity(props: { orders: TOrder[]; total: number; totalToday: number; }) {
    const { orders, total, totalToday } = props;

    return (
        <section className={ Styles.container }>
            <p className="p-1 mt-10 mb-3 text text_type_main-large"></p>
            <section className={` ${ Styles.listContainer } mt-7`}>
                <div className={` ${ Styles.feedContainer } mr-4`}>
                    <p className={` ${ Styles.sticky } text text_type_main-medium mb-3`}>Готовы:</p>
                    <div className={` ${ Styles.feedContainerList } mr-4`}>
                        {orders.map((item) => {
                            if (item.status === EOrderStatus.done)
                            return <p key={item._id} className={`${ Styles.doneOrder } text text_type_digits-default`}>
                                {item.number}
                            </p>
                        })}
                    </div>
                </div>
                <div className={` ${ Styles.feedContainer }`}>
                    <p className={` ${ Styles.sticky } text text_type_main-medium mb-3`}>В работе:</p>
                    <div className={` ${ Styles.feedContainerList } mr-4`}>
                        {orders.map((item) => {
                            if (item.status === EOrderStatus.pending || item.status === EOrderStatus.created)
                            return <p key={item._id} className={`text text_type_digits-default`}>
                                {item.number}
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