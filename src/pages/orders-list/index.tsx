import React from "react";
import styles from "./orders-list.module.css"

export default function OrdersListPage() {
    return (
        <p className={`${styles.shadow} text text_type_main-small mt-15`}>История заказов отсутствует :(</p>
    );
}