import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import {
    Input,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Profile } from "../../components/profile";
import { getUserData } from "../../services/thunk/authorization";
import { userInfoSelector } from "../../services/selectors";

export default function ProfilePage() {
    const userData = useSelector(userInfoSelector);
    const dispatch = useDispatch();
    const onChange = e => {
        // TODO: change data in store
        // setValue({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        dispatch(getUserData())
    }, [dispatch])

    const nameRef = useRef(null)
    const onIconClick = () => {
        nameRef.current.disabled = false;
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const inputOnBlur = (ref) => {
        ref.current.disabled = true;
    }

    if (!userData) {
        return <Navigate to="/login" replace/>
    }

    return (
        <Profile>
            <Input
                placeholder={ "Имя" }
                onChange={ e => onChange(e) }
                value={ userData.name }
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
                value={ userData.email }
                name={ 'email' }
                extraClass="mb-6"
                icon="EditIcon"
                isIcon={ true }
            />
            <PasswordInput
                onChange={ e => onChange(e) }
                value={ '************' }
                name={ 'password' }
                extraClass="mb-6"
                icon="EditIcon"
            />
        </Profile>
    );
}