import React, { FC } from 'react'
import Styles from './order-status.module.css'
import { EOrderStatus } from '../../utils/types'

type TProps = {
    status: string,
    className?: string
}

const configs: Record<TProps['status'], {text: string; className?: string}> = {
    [EOrderStatus.done]: {text: 'Выполнен', className: Styles.doneOrder},
    [EOrderStatus.created]: {text: 'Создан'},
    [EOrderStatus.pending]: {text: 'Готовится'},
    [EOrderStatus.cancelled]: {text: 'Отменен', className: Styles.cancelOrder}
}

export const OrderStatus: FC<TProps> = React.memo(({status, className }) => {
    const config = configs[status]

    if (!config) {
        return null
    }

    return (
        <p className={` ${config.className} text text_type_main-default ${className}`}>{config.text}</p>
    )
})