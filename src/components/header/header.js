import React from 'react';
import { Link } from 'react-router-dom';

import AppHeaderStyles from './header.module.css'

import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    return (
        <>
            <header className={ AppHeaderStyles.menu }>
                <nav className={ AppHeaderStyles.nav }>
                    <Link
                        to={{ pathname: `/` }}
                        className={ AppHeaderStyles.navlink }
                    >
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">Конструктор</p>
                    </Link>
                    <Link
                        to={{ pathname: `/orders` }}
                        className={ AppHeaderStyles.navlink }
                    >
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default">Лента заказов</p>
                    </Link>
                </nav>
                <div className="ml-1"></div>
                <Link to={{ pathname: `/` }} >
                    <Logo />
                </Link>
                <div className={ AppHeaderStyles.navlink }>
                </div>
                <Link
                    to={{ pathname: `/login` }}//todo
                    className={ AppHeaderStyles.navlink }
                >
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default">Личный кабинет</p>
                </Link>
            </header>
        </>
    );
}