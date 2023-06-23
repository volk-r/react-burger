import React, { ReactNode } from "react";

export interface IModalProps {
    header: string;
    onClose: () => void;
    children: ReactNode;
}

export interface IFormValues {
    [key: string]: string;
}

export interface IUseForm {
    formValues: IFormValues;
    setFormValues: (formValues: IFormValues) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IModal {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}