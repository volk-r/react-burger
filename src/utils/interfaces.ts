import React, { ReactNode } from "react";
import { TConstructorIngredient, TIngredient } from "./types";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

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

export interface IProtectedRouteElementProps {
    element: ReactNode;
    onlyUnAuth?: boolean;
}

export interface IErrorOnForm {
    children: string;
}

export interface ErrorBoundaryProps {
    children: ReactNode;
}

export interface ErrorBoundaryState {
    hasError: boolean;
}

export interface IBurgerIngredientsList {
    id: string;
    title: string;
    list: Array<TIngredient>
}

export interface IBurgerConstructorItem {
    index: number;
    burgerConstructorItem: TConstructorIngredient;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

export interface IBurgerConstructor {
    index: number;
    burgerConstructorItem: TConstructorIngredient;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}
