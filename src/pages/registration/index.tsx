import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from '../../services/types/hooks';

import styles from "./registration.module.css";
import {
    Button,
    Input,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'

import { authDataErrorSelector } from "../../services/selectors";
import { registration } from "../../services/thunk/authorization";
import { ErrorOnForm } from "../../components/error-on-form";
import { useForm } from "../../hooks/useForm";
import { ROUTES } from "../../utils/constants";
import { IUseForm } from "../../utils/interfaces";

export default function RegistrationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formValues, handleChange }: IUseForm = useForm({ name: '', email: '', password: '' });
    const message: string | null = useSelector(authDataErrorSelector);

    const handleRedirectToLoginPage = (): void => {
        navigate( ROUTES.ROUTE_LOGIN_PAGE );
    };

    const isDisabledButton = useCallback(
        () => {
            return formValues.name === '' || formValues.email === '' || formValues.password === '';
        }, [formValues]
    );

    const handleRegister = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(registration(formValues));
        }, [dispatch, formValues]
    )

    return (
        <main className={ styles.box }>
            <div className={ styles.container }>
                <p className="text text_type_main-medium mb-7">Регистрация</p>
                {message && <ErrorOnForm>{message}</ErrorOnForm>}
                <form onSubmit={ handleRegister }>
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
                        htmlType="submit"
                        type="primary"
                        size="large"
                        disabled={ isDisabledButton() }
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                    Уже зарегистрированы?
                    <Button
                        style={ {paddingLeft: 8} }
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={ () => handleRedirectToLoginPage() }
                    >
                        Войти
                    </Button>
                </p>
            </div>
        </main>
    );
}