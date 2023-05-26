import React, { memo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ITEM_TYPES } from '../../utils/constants'
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
const style = {
    cursor: 'move',
}
export const BurgerConstructorItem = memo((props) => {
    const { index, burgerConstructorItem, handleDeleteItem, moveIngredient } = props;

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
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
        hover(item, monitor) {
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
        item: () => ({ id: burgerConstructorItem.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // Добавляем перетаскиваемому элементу прозрачность 0,
    // чтобы на его месте визуально появилось пустое пространство
    const opacity = isDragging ? 0 : 1;
    // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
    if (burgerConstructorItem.type !== 'bun') drag(drop(ref));
    // Прерываем базовую функция для onDrop
    // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
    const preventDefault = (e) => e.preventDefault();

    // const [{ opacity }, dragRef] = useDrag({
    //     // Указываем тип получаемых элементов, чтобы dnd понимал,
    //     // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
    //     // Элементы и контейнеры с разными типами не будут взаимодействовать
    //     type: 'ingredient',
    //     // Тут мы положим данные о нашем ингредиенте,
    //     // которые dnd будет передавать в качестве аргумента во внутренние колбэки
    //     item: { ...item },
    //     // Метод collect агрегириует информацию, полученную из мониторов
    //     // и возвращает ее в объекте, первым аргументом нашего хукка
    //     collect: monitor => ({
    //         // Зададим прозрачность перетаскиваемому элементу для красоты
    //         opacity: monitor.isDragging() ? 0.5 : 1
    //     })
    // })

    // const originalIndex = findIngredient(id).index
    // console.log("originalIndex " + originalIndex);
    // const [{ isDragging }, drag] = useDrag(
    //     () => ({
    //         type: ITEM_TYPES.ITEM_INSIDE_CONSTRUCTOR,
    //         item: { id, originalIndex },
    //         collect: (monitor) => ({
    //             isDragging: monitor.isDragging(),
    //         }),
    //         end: (item, monitor) => {
    //             const { id: uiid, originalIndex } = item
    //             console.log("end originalIndex " + originalIndex);
    //             const didDrop = monitor.didDrop()
    //             if (!didDrop) {
    //                 moveIngredient(uiid, originalIndex)
    //                 console.log("end " + uiid + " -> " + originalIndex);
    //             }
    //         },
    //     }),
    //     [],
    // )
    // const [, drop] = useDrop(
    //     () => ({
    //         accept: ITEM_TYPES.ITEM_INSIDE_CONSTRUCTOR,
    //         hover({ id: draggedId }) {
    //             if (draggedId !== id) {
    //                 const { index: overIndex } = findIngredient(id)
    //                 moveIngredient(draggedId, overIndex)
    //                 console.log("accept " + draggedId + " -> " + overIndex);
    //             }
    //         },
    //     }),
    //     [findIngredient, moveIngredient],
    // )
    // const opacity = isDragging ? 0 : 1
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