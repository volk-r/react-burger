import Profile from "../../components/profile";
import styles from "./orders-list.module.css"

export default function OrdersListPage() {
    return (
        <Profile>
            <p className={`${styles.shadow} text text_type_main-small mt-15`}>История заказов отсутствует :(</p>
        </Profile>
    );
}