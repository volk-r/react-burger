import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary'

import HomePage from '../../pages/home'
import LoginPage from '../../pages/login'

export default function App() {
    return (
        <>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        {/*<Route path="/register" element={<RegisterPage />} />*/}
                        {/*<Route path="/forgot-password" element={<ForgotPasswordPage />} />*/}
                        {/*<Route path="/reset-password" element={<ResetPasswordPage />} />*/}
                        {/*<Route path="/ingredients/:id" element={<IngredientPage />} />*/}
                    </Routes>
                </Router>
            </ErrorBoundary>
        </>
    );
}