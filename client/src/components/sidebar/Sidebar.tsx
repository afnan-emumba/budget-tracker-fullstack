import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import SidebarItem from "../sidebarItem/SidebarItem";
import { AnalysisIcon, ExpensesIcon, LogoutIcon } from "../../assets/icons";
import { useUser } from "../../context/UserContext";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar = ({ isVisible }: SidebarProps) => {
  const [selectedItem, setSelectedItem] = useState("Expenses");
  const navigate = useNavigate();
  const { setUserID } = useUser();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setUserID(null);
      window.location.reload();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className={`${styles.sidebar} ${
        isVisible ? styles.expanded : styles.collapsed
      }`}
    >
      <div className={styles.sidebarLogo}>
        <Logo showText={isVisible} />
      </div>
      <div className={styles.sidebarContent}>
        <ul>
          <SidebarItem
            icon={
              <AnalysisIcon
                fillColour={selectedItem === "Analysis" ? "white" : ""}
              />
            }
            text='Analysis'
            isSelected={selectedItem === "Analysis"}
            isVisible={isVisible}
            link='analysis'
            onClick={() => setSelectedItem("Analysis")}
          />
          <SidebarItem
            icon={
              <ExpensesIcon
                fillColour={selectedItem === "Expenses" ? "white" : ""}
              />
            }
            text='Expenses'
            isSelected={selectedItem === "Expenses"}
            isVisible={isVisible}
            onClick={() => setSelectedItem("Expenses")}
          />
          <SidebarItem
            icon={
              <LogoutIcon
                fillColour={selectedItem === "Log Out" ? "white" : ""}
              />
            }
            text='Log Out'
            isSelected={selectedItem === "Log Out"}
            isVisible={isVisible}
            onClick={handleLogout}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
