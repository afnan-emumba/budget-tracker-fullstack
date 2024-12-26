import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: RootState) =>
    state.user.users.some((user) => user.isLoggedIn)
  );
  const location = useLocation();

  if (
    !isLoggedIn &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/reset-password"
  ) {
    return <Navigate to='/login' />;
  }

  if (
    isLoggedIn &&
    (location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/reset-password")
  ) {
    return <Navigate to='/' />;
  }

  return children;
};

export default PrivateRoute;
