import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/types/hooks';

import styles from '../login/login.module.css';
import {
    Button, Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { resetPassword } from '../../utils/burger-api';
import { ErrorOnForm } from '../../components/error-on-form';
import { resetPasswordEmailSelector } from '../../services/selectors';
import { useForm } from '../../hooks/useForm';
import { ROUTES } from "../../utils/constants";
import { IUseForm } from "../../utils/interfaces";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const { formValues, handleChange }: IUseForm = useForm({ password: '', token: '' });
    const [ message, setMessage ] = useState<string | null>(null);
    const resetPasswordEmail = useSelector<string | null>(resetPasswordEmailSelector);

    const handleResetPassword = (e: React.ChangeEvent<HTMLFormElement>): void => {
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

    const handleRedirect = (): void => {
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
    }, [resetPasswordEmail, navigate])

    return (
        <>
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