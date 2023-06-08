import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../login/login.module.css';
import {
    Button, Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from '../../components/header/header';
import { resetPassword } from '../../utils/burger-api';
import { ErrorOnForm } from '../../components/error-on-form';
import { resetPasswordEmailSelector, userInfoSelector } from '../../services/selectors';
import { getUserData } from '../../services/thunk/authorization';
import { useForm } from '../../hooks/useForm';

export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formValues, handleChange } = useForm({ password: '', token: '' });
    const [message, setMessage] = useState(null);

    const user = useSelector(userInfoSelector);
    const resetPasswordEmail = useSelector(resetPasswordEmailSelector);

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    const handleResetPassword = () => {
        resetPassword(formValues).then (response => {
            if (response === 'Password successfully reset') {
                navigate('/profile');
                return;
            }

            setMessage(response);
        }).catch( error => {
            setMessage(error.message);
        });
    };

    const handleRedirect = () => {
        navigate('/login');
    };

    const isDisabledButton = useCallback(
        () => {
        return formValues.password === ''
            || formValues.token === ''
        }, [formValues]
    );

    useEffect(() => {
        if (!resetPasswordEmail) {
            navigate('/forgot-password', { replace: true });
        }
    }, [resetPasswordEmail])

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
                    <p className="text text_type_main-medium mb-7">Восстановление пароля</p>
                    {message && <ErrorOnForm>{message}</ErrorOnForm>}
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
                        htmlType="button"
                        type="primary"
                        size="large"
                        disabled={ isDisabledButton() }
                        onClick={ handleResetPassword }
                    >
                        Сохранить
                    </Button>
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