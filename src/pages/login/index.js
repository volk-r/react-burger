import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../login/login.module.css";
import {
    Button,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";

export default function LoginPage() {
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('')
    const emailOnChange = e => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = useState('')
    const passwordOnChange = e => {
        setPasswordValue(e.target.value)
    }

    const handleRedirect = (redirect) => {
        navigate('/' + redirect);
    };

    const isDisabledButton = () => {
        return emailValue === '' || passwordValue === '';
    };

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Вход</p>
                    <EmailInput
                        onChange={ emailOnChange }
                        value={ emailValue }
                        name={ 'email' }
                        extraClass="mb-7"
                    />
                    <PasswordInput
                        onChange={ passwordOnChange }
                        value={ passwordValue }
                        name={ 'password' }
                        extraClass="mb-7"
                    />
                    <Button extraClass="mb-20" htmlType="button" type="primary" size="large" disabled={ isDisabledButton() }>
                        Войти
                    </Button>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Вы — новый пользователь?
                        <Button style={{paddingLeft: 8}} htmlType="button" type="secondary" size="medium" onClick={ () => handleRedirect("register") }>Зарегистрироваться</Button>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Забыли пароль?
                        <Button style={{paddingLeft: 8}} htmlType="button" type="secondary" size="medium" onClick={ () => handleRedirect("forgot-password") }>Восстановить пароль</Button>
                    </p>
                </div>
            </main>
        </>
    );
}