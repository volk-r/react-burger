import React, { FC } from 'react'
import Styles from './order-item.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient, TOrderItemProps } from '../../utils/types'
import { OrderStatus } from '../order-status/order-status'

const MAX_INGREDINETS = 6

export const OrderItem: FC<TOrderItemProps> = React.memo(({item, showStatus}) => {
    const more = item.ingredients.length - MAX_INGREDINETS
    const ingredients = item.ingredients.slice(0, MAX_INGREDINETS).reverse()

    const totalPrice = item.ingredients.reduce((acc, item: TIngredient) => {
        acc += item.price
        return acc
    }, 0)

    return (
        <div key={item._id} className={` ${Styles.item} p-6 mb-3`}>
            <div className={Styles.between}>
                <p className={` ${Styles.number} text text_type_digits-default`}>#{item.number}</p>
                <FormattedDate className='text_type_main-default text_color_inactive' date={new Date(item.createdAt)}/>
            </div>
            <p className={` ${Styles.number} text text_type_main-medium mt-6`}>{item.name}</p>
            {
                showStatus
                && <OrderStatus status={item.status} className='mt-2'/>
            }
            <div className={` ${Styles.between} mt-6`}>
                <div className={Styles.thumbs}>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className={Styles.gradient}>
                            <div className={Styles.thumb}>
                                <img src={ingredient.image_mobile} alt={item.name}/>
                            </div>
                            {
                                index === 0
                                && more > 0
                                && <div className={` ${Styles.more} text text_type_digits-default`}>
                                    <span className='text text_type_main-default'>+</span>
                                    {more}
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <p className={`${Styles.price} text text_type_digits-default`}>
                    {totalPrice} <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
})