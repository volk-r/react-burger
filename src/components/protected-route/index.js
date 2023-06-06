import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserData } from "../../services/thunk/authorization";
import { useDispatch, useSelector } from "react-redux";
import { authDataRequestSelector, userInfoSelector } from "../../services/selectors";

export function ProtectedRouteElement({ element }) {
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

    return userData ? element : navigate('/login', { state: { from: currentPath } });
}