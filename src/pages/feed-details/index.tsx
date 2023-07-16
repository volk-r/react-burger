import React from 'react';
import AppHeader from "../../components/header/header";
import Styles from "./feed-details.module.css";
import { FeedDetails } from "../../components/feed/components/feed-details/feed-details";
import { ROUTES } from "../../utils/constants";

export default function FeedDetailsPage() {

    return (
        <div className={ Styles.content }>
            <FeedDetails allignCenter={true} route={ROUTES.ROUTE_FEED_PAGE} />
        </div>
    );
}