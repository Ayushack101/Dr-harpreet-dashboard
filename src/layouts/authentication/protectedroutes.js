/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteAdmin = ({ redirectPath = "/" }) => {
  const user = JSON.parse(localStorage.getItem("Credentials"));
  console.log(user);
  if (user?.user?.userType === 1) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};
export const ProtectedRouteAccount = ({ redirectPath = "/" }) => {
  const user = JSON.parse(localStorage.getItem("Credentials"));
  if (user?.user?.userType === 2) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};
export const ProtectedRouteStore = ({ redirectPath = "/" }) => {
  const user = JSON.parse(localStorage.getItem("Credentials"));
  if (user?.user?.userType === 3) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};
export const ProtectedRouteGuard = ({ redirectPath = "/" }) => {
  const user = JSON.parse(localStorage.getItem("Credentials"));
  if (user?.user?.userType === 4) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};
export const ProtectedRouteQuality = ({ redirectPath = "/" }) => {
  const user = JSON.parse(localStorage.getItem("Credentials"));
  if (user?.user?.userType === 5) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};
