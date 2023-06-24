import { useNavigate, useLocation } from 'react-router-dom';
import {ReactElement, useCallback, useEffect, useState} from 'react';
import { getUserData } from "../../services/thunk/authorization";
import { useDispatch, useSelector } from "react-redux";
import { authDataRequestSelector, userInfoSelector } from "../../services/selectors";
import { ROUTES } from "../../utils/constants";
import { IProtectedRouteElementProps } from "../../utils/interfaces";

export function ProtectedRouteElement({ element, onlyUnAuth = false }: IProtectedRouteElementProps): any {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const dispatch: any = useDispatch();
    const [ isUserLoaded, setUserLoaded ] = useState<boolean>(false);

    const init = useCallback(
        () => {
            dispatch(getUserData())
            setUserLoaded(true);
        }, [dispatch]
    );

    useEffect(() => {
        init();
    }, []);

    const userData = useSelector(userInfoSelector);
    const request = useSelector(authDataRequestSelector);

    if (!isUserLoaded || request) {
        return null;
    }

    if (onlyUnAuth === true) {
        const state = location.state;
        let redirect = ROUTES.ROUTE_PROFILE_PAGE;

        if (state?.from) {
            // Redirects back to the previous unauthenticated routes
            redirect = state?.from
        }

        return userData ? navigate(redirect, { replace: true, state: { from: currentPath } }) : element;
    }

    return userData ? element : navigate(ROUTES.ROUTE_LOGIN_PAGE, { state: { from: currentPath } });
}