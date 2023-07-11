import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import styles from "./profile.module.css";

import AppHeader from "../header/header";
import { closeCurrentSession } from "../../services/thunk/authorization";
import { authDataErrorSelector } from "../../services/selectors";
import { ErrorOnForm } from "../error-on-form";
import { ROUTES, NESTED_ROUTES } from "../../utils/constants";
import NotFound404 from "../../pages/not-found";
import OrdersListPage from "../../pages/orders-list";
import ProfilePage from "../../pages/profile";
import {
    Routes,
    Route,
} from 'react-router-dom';
import { TActiveLinkProps } from "../../utils/types";
import { useDispatch, useSelector } from '../../services/types/hooks';

export const Profile = memo(() => {
    const dispatch = useDispatch();
    const setActiveLink = ({ isActive }: TActiveLinkProps) => isActive ? styles.activeLink : styles.inactiveLink;

    const message = useSelector(authDataErrorSelector);

    const handleLogout = () => {
        dispatch(closeCurrentSession());
    }

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <div className={ styles.sidebar }>
                        <ul>
                            <li>
                                <NavLink
                                    to={{ pathname: ROUTES.ROUTE_PROFILE_PAGE }}
                                    className={ setActiveLink }
                                >
                                    <p className="text text_type_main-medium">
                                        Профиль
                                    </p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{ pathname: NESTED_ROUTES.PROFILE_ORDER_LIST_PAGE }}
                                    className={ setActiveLink }
                                >
                                    <p className="text text_type_main-medium">
                                        История заказов
                                    </p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{ pathname: ROUTES.ROUTE_LOGIN_PAGE }}
                                    className={ setActiveLink }
                                    onClick={ handleLogout }
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
                        {message && <ErrorOnForm>{message}</ErrorOnForm>}
                        <Routes>
                            <Route path={ NESTED_ROUTES.PROFILE_USER_INFO } element={<ProfilePage />} />
                            <Route path={ NESTED_ROUTES.PROFILE_ORDER_LIST_PAGE } element={<OrdersListPage />} />
                            <Route path="*" element={<NotFound404 />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </>
    );
})