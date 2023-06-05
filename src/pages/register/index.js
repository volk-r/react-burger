import React, { useCallback, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../login/login.module.css";
import {
    Button,
    Input,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { userInfoSelector } from "../../services/selectors";
import { authorization } from "../../services/thunk/authorization";

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const user = useSelector(userInfoSelector);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleRedirect = (redirect) => {
        navigate('/' + redirect);
    };

    const isDisabledButton = () => {
        return form.name === '' || form.email === '' || form.password === '';
    };

    const handleRegister = useCallback(
        () => {
            dispatch(authorization(form));
        }, [dispatch, form]
    )

    if (user) {
        return (
            <Navigate
                to={'/profile'}
            />
        );
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