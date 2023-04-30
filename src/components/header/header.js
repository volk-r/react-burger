import React from 'react';

import AppHeaderStyles from './header.module.css'

import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
    render() {
        return (
            <>
                <nav className={ AppHeaderStyles.menu }>
                    <nav className={ AppHeaderStyles.nav }>
                        <navlink className={ AppHeaderStyles.navlink }>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">Конструктор</p>
                        </navlink>
                        <navlink className={ AppHeaderStyles.navlink }>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default">Лента заказов</p>
                        </navlink>
                    </nav>
                    <Logo />
                    <navlink className={ AppHeaderStyles.navlink }>
                    </navlink>
                    <navlink className={ AppHeaderStyles.navlink }>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default">Личный кабинет</p>
                    </navlink>
                </nav>
            </>
        );
    }
}

export default AppHeader;