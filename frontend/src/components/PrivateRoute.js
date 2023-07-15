import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../axios_helper'

const PrivateRoute = () => {
    const auth = getAuthToken() !== null && getAuthToken() !== "null";
    return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute