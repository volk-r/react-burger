import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import AppHeaderStyles from './header.module.css'

import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    const setActiveLink = ({ isActive }) => isActive ? AppHeaderStyles.activeLink : AppHeaderStyles.inactiveLink;

    return (
        <>
            <header className={ AppHeaderStyles.menu }>
                <nav className={ AppHeaderStyles.nav }>
                    <NavLink
                        to={{ pathname: `/` }}
                        className={setActiveLink}
                        extraCla
                    >
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">Конструктор</p>
                    </NavLink>
                    <NavLink
                        to={{ pathname: `/orders` }}
                        className={setActiveLink}
                    >
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default">Лента заказов</p>
                    </NavLink>
                </nav>
                <div className="ml-1"></div>
                <Link to={{ pathname: `/` }} >
                    <Logo />
                </Link>
                <div className="ml-1"></div>
                <NavLink
                    to={{ pathname: `/profile` }}
                    className={setActiveLink}
                >
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default">Личный кабинет</p>
                </NavLink>
            </header>
        </>
    );
}