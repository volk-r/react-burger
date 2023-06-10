import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import { updateUserData } from "../../services/thunk/authorization";
import { userInfoSelector } from "../../services/selectors";
import { useForm } from "../../hooks/useForm";

export default function ProfilePage() {
    const userData = useSelector(userInfoSelector);
    const passwordGag = '************';
    const { formValues, setFormValues, handleChange } = useForm({...userData, password: passwordGag});
    const dispatch = useDispatch();

    const nameRef = useRef(null)
    const onIconClick = () => {
        nameRef.current.disabled = false;
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const inputOnBlur = (ref) => {
        ref.current.disabled = true;
    }

    const handleUpdateUserInfo = useCallback(
        () => {
            let data = formValues;

            if (data.password === passwordGag) {
                delete data.password;
            }

            dispatch(updateUserData(data))
        }, [dispatch, formValues]
    );

    const handleCancelUpdateUserInfo = useCallback(
        () => {
            setFormValues({...userData, password: passwordGag});
        }, [userData]
    );

    return (
        <>
            <Input
                placeholder={ "Имя" }
                onChange={ e => handleChange(e) }
                value={ formValues.name }
                name={ 'name' }
                extraClass="mb-6"
                icon="EditIcon"
                ref={ nameRef }
                onIconClick={ onIconClick }
                onBlur={ () => inputOnBlur(nameRef) }
                disabled={ true }
            />
            <EmailInput
                placeholder={ "Логин" }
                onChange={ e => handleChange(e) }
                value={ formValues.email }
                name={ 'email' }
                extraClass="mb-6"
                icon="EditIcon"
                isIcon={ true }
            />
            <PasswordInput
                onChange={ e => handleChange(e) }
                value={ formValues.password }
                name={ 'password' }
                extraClass="mb-6"
                icon="EditIcon"
            />
            <div style={{float: "right"}}>
                <Button
                    extraClass="mb-20 mr-2"
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={ handleUpdateUserInfo }
                >
                    Сохранить
                </Button>
                <Button
                    extraClass="mb-20 mr-6"
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={ handleCancelUpdateUserInfo }
                >
                    Отмена
                </Button>
            </div>
        </>
    );
}