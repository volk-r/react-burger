import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../login/login.module.css";
import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { restorePassword } from "../../utils/burger-api";
import { ErrorOnForm } from "../../components/error-on-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/thunk/authorization";
import { useForm } from "../../hooks/useForm";
import { ROUTES } from "../../utils/constants";
import { IUseForm } from "../../utils/interfaces";

export default function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formValues, handleChange }: IUseForm = useForm({ email: ''});
    const [ message, setMessage ] = useState<string | null>(null);

    const handleRestorePassword = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        restorePassword(formValues.email).then (response => {
            if (response === 'Reset email sent') {
                // TODO
                // @ts-ignore
                dispatch(resetPassword(formValues.email))
                navigate( ROUTES.ROUTE_RESET_PASSWORD_PAGE );
                return;
            }

            setMessage(response);
        }).catch( error => {
            setMessage(error.message);
        });
    };

    const handleRedirectToLoginPage = (): void => {
        navigate( ROUTES.ROUTE_LOGIN_PAGE );
    };

    const isDisabledButton =  useCallback(
        () => {
            return formValues.email === '';
        }, [formValues.email]
    );

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Восстановление пароля</p>
                    {message && <ErrorOnForm>{message}</ErrorOnForm>}
                    <form onSubmit={ handleRestorePassword }>
                        <EmailInput
                            onChange={ e => handleChange(e) }
                            placeholder={ "Укажите e-mail" }
                            value={ formValues.email }
                            name={ 'email' }
                            extraClass="mb-7"
                        />
                        <Button
                            extraClass="mb-20"
                            htmlType="submit"
                            type="primary"
                            size="large"
                            disabled={ isDisabledButton() }
                        >
                            Восстановить
                        </Button>
                    </form>
                    <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                        Вспомнили пароль?
                        <Button
                            style={ {paddingLeft: 8} }
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={ handleRedirectToLoginPage }
                        >
                            Войти
                        </Button>
                    </p>
                </div>
            </main>
        </>
    );
}