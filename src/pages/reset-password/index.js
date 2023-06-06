import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../login/login.module.css";
import {
    Button, Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeader from "../../components/header/header";
import { resetPassword } from "../../utils/burger-api";
import { ErrorOnForm } from "../../components/error-on-form";
import { resetPasswordEmailSelector, userInfoSelector } from "../../services/selectors";
import { getUserData } from "../../services/thunk/authorization";

export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setValue] = useState({ password: '', token: '' });
    const [message, setMessage] = useState(null);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const user = useSelector(userInfoSelector);
    const resetPasswordEmail = useSelector(resetPasswordEmailSelector);

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    const handleResetPassword = () => {
        resetPassword(form).then (response => {
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
        return form.password === ''
            || form.token === ''
        }, [form]
    );

    useEffect(() => {
        if (!resetPasswordEmail) {
            navigate('/forgot-password', { replace: true });
        }
    }, [resetPasswordEmail])

    console.log(resetPasswordEmail);
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
                        onChange={ e => onChange(e) }
                        value={ form.password }
                        name={ 'password' }
                        extraClass="mb-7"
                    />
                    <Input
                        placeholder={ 'Введите код из письма' }
                        onChange={ e => onChange(e) }
                        value={ form.token }
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