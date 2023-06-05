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
    const [form, setValue] = useState({ password: '', token: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleResetPassword = () => {
        resetPassword(form).then (message => {
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
        return form.password === ''
            || form.token === ''
        ;
    };

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Восстановление пароля</p>
                    <PasswordInput
                        placeholder={ 'Введите новый пароль' }
                        onChange={ e => onChange(e) }
                        value={ form.password }
                        name={ 'password' }
                        extraClass="mb-7"
                    />
                    <Input
                        placeholder={ 'Введите код из письма' }
                        onChange={ e => onChange(e) }
                        value={ form.token }
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