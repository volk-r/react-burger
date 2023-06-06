import React, { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Profile } from "../../components/profile";
import { updateUserData } from "../../services/thunk/authorization";
import { userInfoSelector } from "../../services/selectors";

export default function ProfilePage() {
    const userData = useSelector(userInfoSelector);
    const [form, setValue] = useState({...userData, password: '************'});
    const dispatch = useDispatch();
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

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
            dispatch(updateUserData(form))
        }, [dispatch, form]
    );

    const handleCancelUpdateUserInfo = useCallback(
        () => {
            setValue({...userData, password: '************'});
        }, [userData]
    );

    return (
        <Profile>
            <Input
                placeholder={ "Имя" }
                onChange={ e => onChange(e) }
                value={ form.name }
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
                onChange={ e => onChange(e) }
                value={ form.email }
                name={ 'email' }
                extraClass="mb-6"
                icon="EditIcon"
                isIcon={ true }
            />
            <PasswordInput
                onChange={ e => onChange(e) }
                value={ form.password }
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
        </Profile>
    );
}