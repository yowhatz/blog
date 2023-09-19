import React from "react";
import { TOKEN_KEY } from "src/utils/localstorage";
import { Navigate, Outlet } from "react-router-dom";

const AppLayout = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default AppLayout;
