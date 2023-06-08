import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./registration.module.css";
import {
    Button,
    Input,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { authDataErrorSelector, userInfoSelector } from "../../services/selectors";
import { getUserData, registration } from "../../services/thunk/authorization";
import { ErrorOnForm } from "../../components/error-on-form";

export default function RegistrationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const user = useSelector(userInfoSelector);
    const message = useSelector(authDataErrorSelector);

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
            return form.name === '' || form.email === '' || form.password === '';
        }, [form]
    );

    const handleRegister = useCallback(
        () => {
            dispatch(registration(form));
        }, [dispatch, form]
    )

    if (user) {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1, { replace: true });
        } else {
            navigate('/profile', { replace: true });
        }
        return null;
    }

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Регистрация</p>
                    {message && <ErrorOnForm>{message}</ErrorOnForm>}
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