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
                        <div className={ AppHeaderStyles.navlink }>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">Конструктор</p>
                        </div>
                        <div className={ AppHeaderStyles.navlink }>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default">Лента заказов</p>
                        </div>
                    </nav>
                    <div className="ml-1"></div>
                    <Logo />
                    <div className={ AppHeaderStyles.navlink }>
                    </div>
                    <div className={ AppHeaderStyles.navlink }>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default">Личный кабинет</p>
                    </div>
                </nav>
            </>
        );
    }
}

export default AppHeader;