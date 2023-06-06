import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../login/login.module.css";
import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { restorePassword } from "../../utils/burger-api";
import { ErrorOnForm } from "../../components/error-on-form";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../services/selectors";
import { getUserData, resetPassword } from "../../services/thunk/authorization";

export default function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('')
    const [message, setMessage] = useState(null);
    const emailOnChange = e => {
        setEmailValue(e.target.value)
    }

    const user = useSelector(userInfoSelector);

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    const handleRestorePassword = () => {
        restorePassword(emailValue).then (response => {
            if (response === 'Reset email sent') {
                dispatch(resetPassword(emailValue))
                navigate('/reset-password');
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

    const isDisabledButton =  useCallback(
        () => {
            return emailValue === '';
        }, [emailValue]
    );

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
                    <EmailInput
                        onChange={ e => emailOnChange(e) }
                        placeholder={ "Укажите e-mail" }
                        value={ emailValue }
                        name={ 'email' }
                        extraClass="mb-7"
                    />
                    <Button
                        extraClass="mb-20"
                        htmlType="button"
                        type="primary"
                        size="large"
                        disabled={ isDisabledButton() }
                        onClick={ handleRestorePassword }
                    >
                        Восстановить
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