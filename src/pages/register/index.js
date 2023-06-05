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
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleRedirect = (redirect) => {
        navigate('/' + redirect);
    };

    const isDisabledButton = () => {
        return form.name === '' || form.email === '' || form.password === '';
    };

    const handleRegister = () => {
        registerAccount(form).then (data => {
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
                        onChange={ e => onChange(e) }
                        value={ form.name }
                        name={ 'name' }
                        extraClass="mb-7"
                    />
                    <EmailInput
                        onChange={ e => onChange(e) }
                        value={ form.email }
                        name={ 'email' }
                        extraClass="mb-7"
                    />
                    <PasswordInput
                        onChange={ e => onChange(e) }
                        value={ form.password }
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