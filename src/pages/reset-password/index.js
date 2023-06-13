import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from '../login/login.module.css';
import {
    Button, Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from '../../components/header/header';
import { resetPassword } from '../../utils/burger-api';
import { ErrorOnForm } from '../../components/error-on-form';
import { resetPasswordEmailSelector } from '../../services/selectors';
import { useForm } from '../../hooks/useForm';
import { ROUTES } from "../../utils/constants";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const { formValues, handleChange } = useForm({ password: '', token: '' });
    const [message, setMessage] = useState(null);
    const resetPasswordEmail = useSelector(resetPasswordEmailSelector);

    const handleResetPassword = (e) => {
        e.preventDefault();
        resetPassword(formValues).then (response => {
            if (response === 'Password successfully reset') {
                navigate( ROUTES.ROUTE_PROFILE_PAGE );
                return;
            }

            setMessage(response);
        }).catch( error => {
            setMessage(error.message);
        });
    };

    const handleRedirect = () => {
        navigate( ROUTES.ROUTE_LOGIN_PAGE );
    };

    const isDisabledButton = useCallback(
        () => {
        return formValues.password === ''
            || formValues.token === ''
        }, [formValues]
    );

    useEffect(() => {
        if (!resetPasswordEmail) {
            navigate( ROUTES.ROUTE_FORGOT_PASSWORD_PAGE , { replace: true });
        }
    }, [resetPasswordEmail])

    return (
        <>
            <AppHeader />
            <main className={ styles.box }>
                <div className={ styles.container }>
                    <p className="text text_type_main-medium mb-7">Восстановление пароля</p>
                    {message && <ErrorOnForm>{message}</ErrorOnForm>}
                    <form onSubmit={ handleResetPassword }>
                        <PasswordInput
                            placeholder={ 'Введите новый пароль' }
                            onChange={ e => handleChange(e) }
                            value={ formValues.password }
                            name={ 'password' }
                            extraClass="mb-7"
                        />
                        <Input
                            placeholder={ 'Введите код из письма' }
                            onChange={ e => handleChange(e) }
                            value={ formValues.token }
                            name={ 'token' }
                            extraClass="mb-7"
                        />
                        <Button
                            extraClass="mb-20"
                            htmlType="submit"
                            type="primary"
                            size="large"
                            disabled={ isDisabledButton() }
                        >
                            Сохранить
                        </Button>
                    </form>
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