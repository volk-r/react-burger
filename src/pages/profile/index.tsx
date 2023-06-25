import React, { useRef, useCallback, RefObject } from "react";
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
import {IFormValues, IUseForm} from "../../utils/interfaces";

export default function ProfilePage() {
    const userData: IFormValues | null = useSelector(userInfoSelector);
    const passwordGag: string = '************';
    const { formValues, setFormValues, handleChange }: IUseForm = useForm({...userData, password: passwordGag});
    const dispatch: any = useDispatch();

    const nameRef = useRef<HTMLInputElement>(null)
    const onIconClick = (): void => {
        if (!nameRef || !nameRef.current) {
            return;
        }

        nameRef.current.disabled = false;
        setTimeout(() => nameRef.current?.focus(), 0)
    }

    const inputOnBlur = (ref: RefObject<HTMLInputElement>) => {
        if (!ref || !ref.current) {
            return;
        }

        ref.current.disabled = true;
    }

    const handleUpdateUserInfo = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
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
        <form onSubmit={ handleUpdateUserInfo }>
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
                    htmlType="submit"
                    type="primary"
                    size="large"
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
        </form>
    );
}