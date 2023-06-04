import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../login/login.module.css";
import {
    Button, Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { resetPassword } from "../../utils/burger-api";

export default function ResetPasswordPage() {
    const navigate = useNavigate();

    const [passwordValue, setPasswordValue] = useState('')
    const passwordOnChange = e => {
        setPasswordValue(e.target.value)
    }

    const [tokenValue, setTokenValue] = useState('')

    const tokenOnChange = e => {
        setTokenValue(e.target.value)
    }

    const handleResetPassword = () => {
        resetPassword(passwordValue, tokenValue).then (message => {
            if (message === 'Password successfully reset') {
                navigate('/profile');
                return;
            }

            alert("Не удалось установить новый пароль");
        }).catch( err => {
            alert("Не удалось установить новый пароль")
        });
    };

    const handleRedirect = () => {
        navigate('/login');
    };

    const isDisabledButton = () => {
        return passwordValue === '';
    };

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Восстановление пароля</p>
                    <PasswordInput
                        placeholder={ 'Введите новый пароль' }
                        onChange={ passwordOnChange }
                        value={ passwordValue }
                        name={ 'password' }
                        extraClass="mb-7"
                    />
                    <Input
                        placeholder={ 'Введите код из письма' }
                        onChange={ tokenOnChange }
                        value={ tokenValue }
                        name={ 'token' }
                        extraClass="mb-7"
                    />
                    <Button
                        extraClass="mb-20"
                        htmlType="button"
                        type="primary"
                        size="large"
                        disabled={ isDisabledButton() }
                        onClick={ handleResetPassword }
                    >
                        Сохранить
                    </Button>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Вспомнили пароль?
                        <Button
                            style={ {paddingLeft: 8} }
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={ handleRedirect }
                        >
                            Войти
                        </Button>
                    </p>
                </div>
            </main>
        </>
    );
}