import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../login/login.module.css";
import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { restorePassword } from "../../utils/burger-api";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    const handleRestorePassword = () => {
        restorePassword(value).then (message => {
            if (message === 'Reset email sent') {
                navigate('/reset-password');
            } else {
                alert("Указанный вами e-mail не найден")
            }
        }).catch( err => {
            alert("Указанный вами e-mail не найден")
        });
    };

    const handleRedirect = () => {
        navigate('/login');
    };

    const isDisabledButton = () => {
        return value === '';
    };

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Восстановление пароля</p>
                    <EmailInput
                        onChange={ onChange }
                        placeholder={ "Укажите e-mail" }
                        value={ value }
                        name={ 'email' }
                        extraClass="mb-7"
                    />
                    <Button
                        extraClass="mb-20"
                        htmlType="button"
                        type="primary"
                        size="large"
                        disabled={ isDisabledButton() }
                        onClick={ handleRestorePassword }
                    >
                        Восстановить
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