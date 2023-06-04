import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary'

import HomePage from '../../pages/home'
import LoginPage from '../../pages/login'
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import NotFound404 from "../../pages/not-found";

export default function App() {
    return (
        <>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        {/*<Route path="/profile" element={<ProfilePage />} />*/}//todo
                        {/*<Route path="/ingredients/:id" element={<IngredientPage />} />*/}//todo
                        <Route path="*" element={<NotFound404 />} />
                    </Routes>
                </Router>
            </ErrorBoundary>
        </>
    );
}