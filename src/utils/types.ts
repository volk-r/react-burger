/* eslint-disable camelcase */
export type TActiveLinkProps = {
    isActive: boolean;
}

export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
    qty?: number
}

export type TConstructorIngredient = TIngredient & {
    uuid: string,
    index?: number,
}

export type TModalBackDrop = {
    onClick: () => void;
}

export type TListItem = {
    item: TIngredient;
}

export type TUser = {
    name: string;
    email: string;
    password?: string;
} | null

export enum EOrderStatus {
    done = 'done',
    created = 'created',
    pending = 'pending',
    cancelled = 'cancelled'
}

export type TOrderItemProps = {
    item: TOrder,
    showStatus?: boolean,
}

export type TOrder = {
    _id: string;
    ingredients: TIngredient[];
    "owner": {
        "name": string,
        "email": string,
        "createdAt": string,
        "updatedAt": string
    },
    status: EOrderStatus;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
}