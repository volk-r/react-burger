import React, {ReactElement, useEffect} from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import {
    hasErrorIngredientsSelector,
    ingredientsSelector,
    isLoadingIngredientsSelector
} from "../../services/selectors";
import { useParams } from 'react-router-dom';
import AppHeader from "../../components/header/header";
import Styles from "./feed-details.module.css";
import { FeedDetails } from "../../components/feed/components/feed-details/feed-details";
import { ROUTES } from "../../utils/constants";

export default function FeedDetailsPage() {
    // TODO
    // const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     dispatch(getIngredientsList())
    // }, [])
    //
    // const ingredients: Array<TIngredient> | [] = useSelector(ingredientsSelector);
    // const isLoading = useSelector<boolean>(isLoadingIngredientsSelector);
    // const hasError = useSelector<boolean>(hasErrorIngredientsSelector);
    //
    // const { ingredientid } = useParams();
    // const selectedItem: TIngredient | undefined = ingredients.find(({ _id }) => _id === ingredientid)

    const ErrorBlock = (): ReactElement => {
        return (
            <section className={ Styles.errorBlock }>
                <h1>Что-то пошло не так :(</h1>
                <p>
                    Ошибка загрузки данных. Пожалуйста, перезагрузите страницу или попробуйте позже.
                </p>
            </section>
        );
    }

    return (
        <>
            <AppHeader />
            {/*{isLoading === true && <p className={ Styles.loading }>Loading...</p>}*/}
            {/*{*/}
            {/*    isLoading === false*/}
            {/*    && hasError === true*/}
            {/*    && <ErrorBlock />*/}
            {/*}*/}
            {/*{isLoading === false*/}
            {/*    && hasError === false*/}
            {/*    && selectedItem*/}
            {/*    &&*/}
                <div className={ Styles.content }>
                    <FeedDetails allignCenter={true} route={ROUTES.ROUTE_FEED_PAGE} />
                </div>
            {/*}*/}
        </>
    );
}