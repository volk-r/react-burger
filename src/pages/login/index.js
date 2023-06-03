import React from "react";
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

    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = React.useState('')
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const handleRegister = () => {
        navigate('/register');
    };

    const handleForgotPassword = (redirect) => {
        navigate('/forgot-password');
    };

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Вход</p>
                    <EmailInput
                        onChange={onChange}
                        value={value}
                        name={'email'}
                        isIcon={false}
                        extraClass="mb-7"
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={passwordValue}
                        name={'password'}
                        extraClass="mb-7"
                    />
                    <Button extraClass="mb-20" htmlType="button" type="primary" size="large" disabled={ false }>
                        Войти
                    </Button>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Вы — новый пользователь?
                        <Button htmlType="button" type="secondary" size="medium" onClick={ handleRegister }>Зарегистрироваться</Button>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Забыли пароль?
                        <Button htmlType="button" type="secondary" size="medium" onClick={ handleForgotPassword }>Восстановить пароль</Button>
                    </p>
                </div>
            </main>
        </>
    );
}