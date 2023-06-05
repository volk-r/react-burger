import React, { useState, useRef } from "react";

import {
    Input,
    EmailInput,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import Profile from "../../components/profile";

export default function ProfilePage() {
    const [nameValue, setNameValue] = useState('')

    const nameOnChange = e => {
        setNameValue(e.target.value)
    }

    const [emailValue, setEmailValue] = useState('')
    const emailOnChange = e => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = useState('')
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const nameRef = useRef(null)
    const onIconClick = () => {
        nameRef.current.disabled = false;
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const inputOnBlur = (ref) => {
        ref.current.disabled = true;
    }

    return (
        <Profile>
            <Input
                placeholder={ "Имя" }
                onChange={ e => nameOnChange(e) }
                value={ nameValue }
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
                onChange={ e => emailOnChange(e) }
                value={ emailValue }
                name={ 'email' }
                extraClass="mb-6"
                icon="EditIcon"
                isIcon={ true }
            />
            <PasswordInput
                onChange={ e => onChangePassword(e) }
                value={ passwordValue }
                name={ 'password' }
                extraClass="mb-6"
                icon="EditIcon"
            />
        </Profile>
    );
}