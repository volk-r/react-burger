import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./profile.module.css";

import AppHeader from "../header/header";

export default function Profile({ children }) {
    const setActiveLink = ({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink;

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <div className={ styles.sidebar }>
                        <ul>
                            <li>
                                <NavLink
                                    to={{ pathname: `/profile` }}
                                    className={setActiveLink}
                                >
                                    <p className="text text_type_main-medium">
                                        Профиль
                                    </p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{ pathname: `/orders` }}
                                    className={setActiveLink}
                                >
                                    <p className="text text_type_main-medium">
                                        История заказов
                                    </p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{ pathname: `/` }}
                                    className={setActiveLink}
                                >
                                    <p className="text text_type_main-medium">
                                        Выход
                                    </p>
                                </NavLink>
                            </li>
                        </ul>
                        <p className="text text_type_main-default text_color_inactive pr-5 pl-5 pt-20">
                            В этом разделе вы можете
                            <br/>
                            изменить свои персональные данные
                        </p>
                    </div>
                    <div className={ styles.content }>
                        { children }
                    </div>
                </div>
            </main>
        </>
    );
}