import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../login/login.module.css";
import {
    Button,
    Input,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { registerAccount } from "../../utils/burger-api";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [nameValue, setNameValue] = useState('')

    const nameOnChange = e => {
        setNameValue(e.target.value)
    }

    const [emailValue, setEmailValue] = useState('')
    const emailOnChange = e => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = useState('')
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const handleRedirect = (redirect) => {
        navigate('/' + redirect);
    };

    const isDisabledButton = () => {
        return emailValue === '' || nameValue === '' || passwordValue === '';
    };

    const handleRegister = () => {
        registerAccount({
            "email": emailValue,
            "password": passwordValue,
            "name": nameValue
        }).then (data => {
            if (data.success === false) {
                alert("К сожалению нам не удалось вас зарегистрировать, попробуйте позже");
                return;
            }

            navigate('/profile');
        }).catch( err => {
            alert("К сожалению нам не удалось вас зарегистрировать, попробуйте позже");
        });
    }

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Регистрация</p>
                    <Input
                        placeholder={ "Имя" }
                        onChange={ e => nameOnChange(e) }
                        value={ nameValue }
                        name={ 'name' }
                        extraClass="mb-7"
                    />
                    <EmailInput
                        onChange={ e => emailOnChange(e) }
                        value={ emailValue }
                        name={ 'email' }
                        extraClass="mb-7"
                    />
                    <PasswordInput
                        onChange={ e => onChangePassword(e) }
                        value={ passwordValue }
                        name={ 'password' }
                        extraClass="mb-7"
                    />
                    <Button
                        extraClass="mb-20"
                        htmlType="button"
                        type="primary"
                        size="large"
                        disabled={ isDisabledButton() }
                        onClick={ handleRegister }
                    >
                        Зарегистрироваться
                    </Button>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Уже зарегистрированы?
                        <Button
                            style={ {paddingLeft: 8} }
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={ () => handleRedirect("login") }
                        >
                            Войти
                        </Button>
                    </p>
                </div>
            </main>
        </>
    );
}