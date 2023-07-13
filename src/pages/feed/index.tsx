import React from "react";
import styles from "./feed.module.css";
import AppHeader from "../../components/header/header";
import Feed from "../../components/feed/feed";
import { useSelector } from '../../services/types/hooks';
import FeedActivity from "../../components/feed-activity/feed-activity";
import { orders } from "../../utils/data";// todo

export default function FeedPage() {
    // const { orders, total, totalToday } = useSelector((state) => state.orders);
    const total = 1976;
    const totalToday = 3;

    // if (orders.length === 0) {
    //     return null;
    // }

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <Feed orders={orders} />
                <FeedActivity orders={orders} total={total} totalToday={totalToday} />
            </main>
        </>
    );
}