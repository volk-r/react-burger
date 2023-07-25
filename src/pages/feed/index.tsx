import React, {useEffect} from "react";
import styles from "./feed.module.css";
import { Feed } from "../../components/feed/feed";
import { useDispatch, useSelector } from '../../services/types/hooks';
import FeedActivity from "../../components/feed-activity/feed-activity";
import { feedSelector } from "../../services/selectors";
import { wsCloseAction, wsConnectAction } from "../../services/thunk/web-socket";
import { SOCKET_URL_ORDERS_ALL } from "../../utils/burger-api";
import { WebsocketStatus } from "../../utils/types";
import { Preload } from "../../components/preload";

export default function FeedPage() {
    const dispatch = useDispatch();
    const { status, orders, total, totalToday } = useSelector(feedSelector);

    useEffect(() => {
        dispatch(wsConnectAction(SOCKET_URL_ORDERS_ALL));

        return () => {
            dispatch(wsCloseAction())
        }
    }, [dispatch])

    if (status === WebsocketStatus.CONNECTING) { return <Preload/>; }

    return (
        <main className={ styles.box }>
            <Feed orders={orders} />
            <FeedActivity orders={orders} total={total} totalToday={totalToday} />
        </main>
    );
}