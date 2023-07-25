import React from 'react';
import Styles from "./feed-details.module.css";
import { FeedDetails } from "../../components/feed/components/feed-details/feed-details";

export default function FeedDetailsPage() {
    return (
        <div className={ Styles.content }>
            <FeedDetails allignCenter={true} />
        </div>
    );
}