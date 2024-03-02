import React from 'react';
import { Navigate } from 'react-router-dom';
import { getJwtToken } from '../utils/helper';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {

    if (!getJwtToken()) {
        return <Navigate to="/login" replace={true} />
    }
    return <>{children}</>;
};

export default ProtectedRoute;
