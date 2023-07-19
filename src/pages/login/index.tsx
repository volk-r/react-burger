import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useForm } from '../../hooks/useForm';

import styles from '../login/login.module.css';

import {
    Button,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ErrorOnForm } from '../../components/error-on-form'

import { authorization } from '../../services/thunk/authorization';
import { authDataErrorSelector } from '../../services/selectors';
import { ROUTES } from "../../utils/constants";
import { IUseForm } from "../../utils/interfaces";

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const message: string | null = useSelector(authDataErrorSelector);
    const { formValues, handleChange }: IUseForm = useForm({ email: '', password: '' });

    const handleRedirect = (redirect: string): void => {
        navigate( redirect );
    };

    const isDisabledButton = useCallback(
        () => {
            return formValues.email === '' || formValues.password === '';
        }, [formValues]
    );

    const handleLogin = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(authorization(formValues))
        }, [dispatch, formValues]
    );

    return (
        <main className={ styles.box }>
            <div className={ styles.container }>
                <p className="text text_type_main-medium mb-7">Вход</p>
                {message && <ErrorOnForm>{message}</ErrorOnForm>}
                <form onSubmit={ handleLogin }>
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
                        Войти
                    </Button>
                </form>
                <p className="text text_type_main-default text_color_inactive pl-6 pr-1">
                    Вы — новый пользователь?
                    <Button
                        style={ {paddingLeft: 8} }
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={ () => handleRedirect( ROUTES.ROUTE_REGISRATION_PAGE ) }
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
                        onClick={ () => handleRedirect( ROUTES.ROUTE_FORGOT_PASSWORD_PAGE ) }
                    >
                        Восстановить пароль
                    </Button>
                </p>
            </div>
        </main>
    );
}