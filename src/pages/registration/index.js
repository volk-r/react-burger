import React, { useCallback } from "react";
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
import { authDataErrorSelector } from "../../services/selectors";
import { registration } from "../../services/thunk/authorization";
import { ErrorOnForm } from "../../components/error-on-form";
import { useForm } from "../../hooks/useForm";

export default function RegistrationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formValues, handleChange } = useForm({ name: '', email: '', password: '' });
    const message = useSelector(authDataErrorSelector);

    const handleRedirect = (redirect) => {
        navigate('/' + redirect);
    };

    const isDisabledButton = useCallback(
        () => {
            return formValues.name === '' || formValues.email === '' || formValues.password === '';
        }, [formValues]
    );

    const handleRegister = useCallback(
        () => {
            dispatch(registration(formValues));
        }, [dispatch, formValues]
    )

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Регистрация</p>
                    {message && <ErrorOnForm>{message}</ErrorOnForm>}
                    <Input
                        placeholder={ "Имя" }
                        onChange={ e => handleChange(e) }
                        value={ formValues.name }
                        name={ 'name' }
                        extraClass="mb-7"
                    />
                    <EmailInput
                        onChange={ e => handleChange(e) }
                        value={ formValues.email }
                        name={ 'email' }
                        extraClass="mb-7"
                    />
                    <PasswordInput
                        onChange={ e => handleChange(e) }
                        value={ formValues.password }
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