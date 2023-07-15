import React, {useEffect} from "react";
import styles from "./feed.module.css";
import AppHeader from "../../components/header/header";
import { Feed } from "../../components/feed/feed";
import { useDispatch, useSelector } from '../../services/types/hooks';
import FeedActivity from "../../components/feed-activity/feed-activity";
import { feedSelector } from "../../services/selectors";
import { wsCloseAction, wsConnectAction } from "../../services/thunk/web-socket";
import {SOCKET_URL_ORDERS_ALL }  from "../../utils/burger-api";
import { WebsocketStatus } from "../../utils/types";

export default function FeedPage() {
    const dispatch = useDispatch();
    const { status, orders, total, totalToday } = useSelector(feedSelector);

    useEffect(() => {
        dispatch(wsConnectAction(SOCKET_URL_ORDERS_ALL));

        return () => {
            dispatch(wsCloseAction())
        }
    }, [dispatch])

    console.log("orders", orders)// todo

    if (status === WebsocketStatus.CONNECTING) return null;// todo

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