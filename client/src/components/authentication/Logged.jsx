import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useAuthenticate from "../../utils/useAuthenticate";

const Logged = () => {
  const { isLogged } = useAuthenticate();

  if (isLogged) return <Navigate replace to="/" />;

  return <>{children}</>;
};

export default Logged;
