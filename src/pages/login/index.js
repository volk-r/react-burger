import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../login/login.module.css";

import {
    Button,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from "../../components/header/header";
import { ErrorOnForm } from "../../components/error-on-form"

import { authorization, getUserData } from "../../services/thunk/authorization";
import { authDataErrorSelector, userInfoSelector } from "../../services/selectors";

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(userInfoSelector);
    const message = useSelector(authDataErrorSelector);

    const [form, setValue] = useState({ email: '', password: '' });

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleRedirect = (redirect) => {
        navigate('/' + redirect);
    };

    const isDisabledButton = useCallback(
        () => {
            return form.email === '' || form.password === '';
        }, [form]
    );

    const handleLogin = useCallback(
        () => {
            dispatch(authorization(form))
        }, [dispatch, form]
    );

    if (user) {
        const state = location.state;
        if (state?.from) {
            // Redirects back to the previous unauthenticated routes
            navigate(state?.from, {replace: true});
        } else {
            navigate('/');
        }
        return null;
    }

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Вход</p>
                    {message && <ErrorOnForm>{message}</ErrorOnForm>}
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
                        onClick={ handleLogin }
                    >
                        Войти
                    </Button>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Вы — новый пользователь?
                        <Button
                            style={ {paddingLeft: 8} }
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={ () => handleRedirect("register") }
                        >
                            Зарегистрироваться
                        </Button>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Забыли пароль?
                        <Button
                            style={ {paddingLeft: 8} }
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={ () => handleRedirect("forgot-password") }
                        >
                            Восстановить пароль
                        </Button>
                    </p>
                </div>
            </main>
        </>
    );
}