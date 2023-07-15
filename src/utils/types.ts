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

export const EOrderStatus = {
    done: 'done',
    created: 'created',
    pending: 'pending',
    cancelled: 'cancelled'
} as const

export type TOrderItemProps = {
    item: TOrder,
    showStatus?: boolean,
}

export type TOrder = {
    _id: string;
    ingredients: TIngredient[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

export type TSocketData = {
    success: boolean;
    message?: string;
    orders?: TOrder[];
    total?: number;
    totalToday?: number;
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}