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