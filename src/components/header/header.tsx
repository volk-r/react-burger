import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import AppHeaderStyles from './header.module.css'

import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTES } from "../../utils/constants";
import { TActiveLinkProps } from "../../utils/types";

export default function AppHeader() {
    const setActiveLink = ({ isActive }: TActiveLinkProps): string => isActive ? AppHeaderStyles.activeLink : AppHeaderStyles.inactiveLink;

    return (
        <>
            <header className={ AppHeaderStyles.menu }>
                <nav className={ AppHeaderStyles.nav }>
                    <NavLink
                        to={{ pathname: ROUTES.ROUTE_HOME_PAGE }}
                        className={setActiveLink}
                    >
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">Конструктор</p>
                    </NavLink>
                    <NavLink
                        to={{ pathname: ROUTES.ROUTE_ORDER_LIST_PAGE }}
                        className={setActiveLink}
                    >
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default">Лента заказов</p>
                    </NavLink>
                </nav>
                <Link to={{ pathname: ROUTES.ROUTE_HOME_PAGE }} >
                    <Logo />
                </Link>
                <div className="ml-30"></div>
                <NavLink
                    to={{ pathname: ROUTES.ROUTE_PROFILE_PAGE }}
                    className={setActiveLink}
                >
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default">Личный кабинет</p>
                </NavLink>
            </header>
        </>
    );
}