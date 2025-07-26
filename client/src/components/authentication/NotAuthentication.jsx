import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useAuthenticate from "../../utils/useAuthenticate";

const NotAuthentication = ({ children }) => {
  const { isAuthenticated } = useAuthenticate();

  if (isAuthenticated) return <Navigate replace to="/" />;
  return <>{!isAuthenticated && children}</>;
};

export default NotAuthentication;
