import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../../axios_helper'

const AdminRoute = () => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  const isAdmin = () => {
    const jwtToken = getAuthToken();
    const isLoggedIn = jwtToken !== null && jwtToken !== "null";
    if (isLoggedIn && parseJwt(jwtToken).roles[0] === "ROLE_ADMIN") {
      return true;
    }
    return false;
  }
  return isAdmin() ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute