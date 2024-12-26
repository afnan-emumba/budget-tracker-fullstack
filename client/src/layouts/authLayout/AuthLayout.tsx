import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import "./AuthLayout.css";

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <div className='auth-logo'>
        <Logo />
      </div>
      {children || <Outlet />}
    </>
  );
};

export default AuthLayout;
