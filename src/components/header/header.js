import React from 'react';

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
                    <a href="#" className={ AppHeaderStyles.navlink }>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">Конструктор</p>
                    </a>
                    <a href="http://localhost:3000/#bun" className={ AppHeaderStyles.navlink }>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default">Лента заказов</p>
                    </a>
                </nav>
                <div className="ml-1"></div>
                <a href="#" >
                    <Logo />
                </a>
                <div className={ AppHeaderStyles.navlink }>
                </div>
                <a href="#" className={ AppHeaderStyles.navlink }>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default">Личный кабинет</p>
                </a>
            </header>
        </>
    );
}