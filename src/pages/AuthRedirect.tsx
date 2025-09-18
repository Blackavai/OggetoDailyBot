import React, { useEffect } from 'react';
import { useAuth } from './AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';

interface AuthRedirectProps {
    children: React.ReactNode; // Определяем тип для children
}
const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return <>{children || <Outlet />}</>; // Используем Outlet для отображения дочерних маршрутов
};

export default AuthRedirect;
