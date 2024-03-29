import React, { CSSProperties, DragEventHandler, memo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'

import { ITEM_TYPES } from '../../utils/constants'
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { decreaseIngrideintsCount } from "../../services/thunk/burger-ingredients";
import { removeItemFromConstructor } from "../../services/thunk/burger-constructor";
import { IBurgerConstructorItem } from "../../utils/interfaces";
import { TConstructorIngredient } from "../../utils/types";
import { useDispatch } from '../../services/types/hooks';

const style: CSSProperties = {
    cursor: 'move',
    width: "99%",
    display: "flex",
    alignItems: "center",
    gap: "8px",
}

export const BurgerConstructorItem = memo((props: IBurgerConstructorItem) => {
    const { index, burgerConstructorItem, moveIngredient } = props;
    const dispatch = useDispatch();

    const handleDeleteItem = (item: TConstructorIngredient) => {
        dispatch(decreaseIngrideintsCount(item));
        dispatch(removeItemFromConstructor(item));
    };

    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<IBurgerConstructorItem, void, { handlerId: Identifier | null }>({
        // Указываем тип получаемых элементов, чтобы dnd понимал,
        // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
        // Элементы и контейнеры с разными типами не будут взаимодействовать
        accept: ITEM_TYPES.ITEM_INSIDE_CONSTRUCTOR,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        // Вызывается, когда перетаскиваемый элемент оказывается над ингредиентом,
        // индекс которого у нас задан в пропсах props.index
        hover(item: {
                index: number;
            }, monitor) {
            if (!ref.current) {
                return;
            }
            // Переопределяем индексы ингредиентов для удобства
            const dragIndex = item.index;
            const hoverIndex = index;
            // Ничего не делаем, если ингредиент находится
            if (dragIndex === hoverIndex) {
                return;
            }
            // Определяем границы карточки ингредиента
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Определяем середину карточки по оси Y нашего ингредиента
            // В момент пересечения этой границы, перетаскиваемым ингредиентом
            // Мы будем менять их местами
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Получаем текущую позицию курсора,
            // относительно текущего контейнера
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }
            // Вычисляем координаты курсора и координаты середины карточки
            // на которую мы навели наш перетаскиваемый ингредиент
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Условие для перетаскивания элементов сверху вниз
            // Если перетаскиваемый ингредиент пересекает середину
            // текущего ингредиента, то мы идем дальше и выполняем moveCard
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Условие для перетаскивания элементов снизу вверх
            // Происходит тоже самое что и выше, только в обратном порядке
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Выполняем наш коллбэк с перемещением карточек внутри массива
            moveIngredient(dragIndex, hoverIndex);
            // Это сделано для внутренней оптимизации библиотеки
            // для поиска и замены элементом
            item.index = hoverIndex;
        }
    })
    // Задаем функционал перетаскивания для элементов внутри списка
    // ингредиентов заказа
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPES.ITEM_INSIDE_CONSTRUCTOR,
        item: () => ({ id: burgerConstructorItem._id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // Добавляем перетаскиваемому элементу прозрачность 0,
    // чтобы на его месте визуально появилось пустое пространство
    const opacity = isDragging ? 0 : 1;
    // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
    drag(drop(ref));
    // Прерываем базовую функцию для onDrop
    // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
    const preventDefault: DragEventHandler<HTMLDivElement> = (e) => e.preventDefault();

    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            onDrop={preventDefault}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={ burgerConstructorItem.name }
                price={ burgerConstructorItem.price }
                thumbnail={ burgerConstructorItem.image }
                handleClose={ () => handleDeleteItem(burgerConstructorItem) }
            />
        </div>
    )
})