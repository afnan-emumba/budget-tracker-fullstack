import { Link } from "react-router";
import { useEffect, useState } from "react";
import { MenuIcon, NotificationIcon } from "../../assets/icons";
import Logo from "../logo/Logo";
import Placeholder from "../../assets/images/placeholder_avatar.jpg";
import { useUser } from "../../context/UserContext";
import { User } from "../../utils/interfaces";
import axios from "axios";
import styles from "./Navbar.module.css";

interface NavbarProps {
  toggleSidebar?: () => void;
  showMenuIcon?: boolean;
  showLogo?: boolean;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const Navbar = ({
  toggleSidebar,
  showMenuIcon = true,
  showLogo = false,
}: NavbarProps) => {
  const { userID } = useUser();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (userID) {
      axios
        .get(`${baseUrl}/users/${userID}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userID]);

  return (
    <nav className={styles.navbar}>
      {showMenuIcon && (
        <span className={styles.sidebarToggleButton} onClick={toggleSidebar}>
          <MenuIcon />
        </span>
      )}

      {showLogo && <Logo />}
      <div className={styles.navbarContent}>
        <div className={styles.notificationIcon}>
          <NotificationIcon />
        </div>
        <div className={styles.userAvatar}>
          <Link to={"/profile"}>
            <img
              src={user?.profilePicture || Placeholder}
              alt='avatar'
              className={styles.avatar}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
