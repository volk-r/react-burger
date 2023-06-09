import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserData } from "../../services/thunk/authorization";
import { useDispatch, useSelector } from "react-redux";
import { authDataRequestSelector, userInfoSelector } from "../../services/selectors";
import PropTypes from "prop-types";

export function ProtectedRouteElement({ element, onlyUnAuth = false }) {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);

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
        let redirect = '/profile';

        if (state?.from) {
            // Redirects back to the previous unauthenticated routes
            redirect = state?.from
        }

        return userData ? navigate(redirect, { replace: true, state: { from: currentPath } }) : element;
    }

    return userData ? element : navigate('/login', { state: { from: currentPath } });
}

ProtectedRouteElement.propTypes = {
    onlyUnAuth: PropTypes.bool,
};