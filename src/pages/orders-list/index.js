import { Profile } from "../../components/profile";
import styles from "./orders-list.module.css"
import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../services/selectors";

export default function OrdersListPage() {
    const userData = useSelector(userInfoSelector);

    if (!userData) {
        return <Navigate to="/login" replace/>
    }

    return (
        <Profile>
            <p className={`${styles.shadow} text text_type_main-small mt-15`}>История заказов отсутствует :(</p>
        </Profile>
    );
}