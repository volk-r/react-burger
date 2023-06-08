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
import ProfilePage from '../../pages/profile';
import OrdersListPage from '../../pages/orders-list';
import IngredientDetailsPage from '../../pages/ingredient-details/';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    let background = location.state?.background;

    const handleCloseModal = () => {
        navigate("/", { replace: true });
    };

    return (
        <>
            <ErrorBoundary>
                <Routes location={ background || location }>
                    <Route path={ ROUTES.ROUTE_HOME_PAGE } element={<HomePage />} />
                    <Route path={ ROUTES.ROUTE_LOGIN_PAGE } element={<LoginPage />} />
                    <Route path={ ROUTES.ROUTE_REGISRATION_PAGE } element={<RegistrationPage />} />
                    <Route path={ ROUTES.ROUTE_FORGOT_PASSWORD_PAGE } element={<ForgotPasswordPage />} />
                    <Route path={ ROUTES.ROUTE_RESET_PASSWORD_PAGE } element={<ResetPasswordPage />} />
                    <Route path={ ROUTES.ROUTE_PROFILE_PAGE } element={<ProtectedRouteElement element={<ProfilePage />}/>} />
                    <Route path={ ROUTES.ROUTE_ORDER_LIST_PAGE } element={<ProtectedRouteElement element={<OrdersListPage />}/>} />
                    <Route path={ ROUTES.ROUTE_INGREDIENT_DETAILS_PAGE } element={<IngredientDetailsPage />} />
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
                {background && (
                    <Routes>
                        <Route path={ ROUTES.ROUTE_INGREDIENT_DETAILS_PAGE } element={
                            // TODO: tsx gap
                            // @ts-ignore
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