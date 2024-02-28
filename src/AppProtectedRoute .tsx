import 'reflect-metadata';
import { container } from 'tsyringe';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from './services/authService';
import { SafeAny } from './common/types/baseType';
import { AppRouter } from './AppRouter';

/**
 * For protected route with authentication
 * @param param0 
 * @returns 
 */
export const ProtectedRoute = ({ children }: SafeAny): React.ReactElement | null => {
    const authService = container.resolve(AuthService);
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
        // user is not authenticated
        return <Navigate to={AppRouter.login} />;
    }
    return children;
};