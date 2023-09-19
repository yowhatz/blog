import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TOKEN_KEY } from "src/utils/localstorage";

const AuthLayout = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default AuthLayout;
