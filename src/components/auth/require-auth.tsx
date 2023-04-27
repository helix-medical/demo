import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import { getRole } from '../../config/config';

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const role = [auth];

    return role?.find((r) => allowedRoles.includes(r)) ? (
        <Outlet />
    ) : auth?.id ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
