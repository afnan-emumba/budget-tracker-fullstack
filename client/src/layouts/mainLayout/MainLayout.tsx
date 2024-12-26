import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./MainLayout.css";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className='main-layout'>
      <Sidebar isVisible={sidebarVisible} />
      <div
        className={`main-content ${sidebarVisible ? "expanded" : "collapsed"}`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <div className='main-page'>{children || <Outlet />}</div>
      </div>
    </div>
  );
};

export default MainLayout;
