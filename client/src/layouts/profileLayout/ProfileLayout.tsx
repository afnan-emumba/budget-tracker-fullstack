import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./ProfileLayout.css";

interface ProfileLayoutProps {
  children?: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className='profile-layout'>
      <Navbar showLogo={true} showMenuIcon={false} />
      <div className='profile-content'>{children || <Outlet />}</div>
    </div>
  );
};

export default ProfileLayout;
