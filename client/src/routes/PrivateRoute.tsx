import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/reset-password"
  ) {
    return <Navigate to='/login' />;
  }

  if (
    token &&
    (location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/reset-password")
  ) {
    return <Navigate to='/' />;
  }

  return children;
};

export default PrivateRoute;
