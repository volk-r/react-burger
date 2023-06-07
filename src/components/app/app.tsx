import React from 'react';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary'
import { ProtectedRouteElement } from "../protected-route";

import HomePage from '../../pages/home'
import LoginPage from '../../pages/login'
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import NotFound404 from "../../pages/not-found";
import ProfilePage from "../../pages/profile";
import OrdersListPage from "../../pages/orders-list";
import IngredientDetailsPage from "../../pages/ingredient-details/";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

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
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
                    <Route path="/orders" element={<ProtectedRouteElement element={<OrdersListPage />}/>} />
                    <Route path="/ingredients/:ingredientid" element={<IngredientDetailsPage />} />
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
                {background && (
                    <Routes>
                        <Route path="/ingredients/:ingredientid" element={
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