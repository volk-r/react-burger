import React from 'react';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary'
import { ProtectedRouteElement } from '../protected-route';
import { ROUTES } from '../../utils/constants'

import HomePage from '../../pages/home'
import LoginPage from '../../pages/login'
import RegistrationPage from '../../pages/registration';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import NotFound404 from '../../pages/not-found';
import { Profile } from '../profile';
import IngredientDetailsPage from '../../pages/ingredient-details/';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import FeedPage from "../../pages/feed";

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    let background = location.state?.background;

    const handleCloseModal = (): void => {
        navigate( ROUTES.ROUTE_HOME_PAGE , { replace: true });
    };

    return (
        <>
            <ErrorBoundary>
                <Routes location={ background || location }>
                    <Route path={ ROUTES.ROUTE_HOME_PAGE } element={<HomePage />} />
                    <Route path={ ROUTES.ROUTE_LOGIN_PAGE } element={<ProtectedRouteElement onlyUnAuth={ true } element={<LoginPage />} />} />
                    <Route path={ ROUTES.ROUTE_REGISRATION_PAGE } element={<ProtectedRouteElement onlyUnAuth={ true } element={<RegistrationPage />}/>} />
                    <Route path={ ROUTES.ROUTE_FORGOT_PASSWORD_PAGE } element={<ProtectedRouteElement onlyUnAuth={ true } element={<ForgotPasswordPage />}/>} />
                    <Route path={ ROUTES.ROUTE_RESET_PASSWORD_PAGE } element={<ProtectedRouteElement onlyUnAuth={ true } element={<ResetPasswordPage />}/>} />
                    <Route path={ ROUTES.ROUTE_PROFILE_ROOT } element={<ProtectedRouteElement element={<Profile />}/>} />
                    <Route path={ ROUTES.ROUTE_INGREDIENT_DETAILS_PAGE } element={<IngredientDetailsPage />} />
                    <Route path={ ROUTES.ROUTE_FEED_PAGE } element={<FeedPage />} />
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
                {background && (
                    <Routes>
                        <Route path={ ROUTES.ROUTE_INGREDIENT_DETAILS_PAGE } element={
                            <Modal header="Детали ингредиента" onClose={ handleCloseModal } >
                                <IngredientDetails />
                            </Modal>
                        } />
                    </Routes>
                )}
            </ErrorBoundary>
        </>
    );
}