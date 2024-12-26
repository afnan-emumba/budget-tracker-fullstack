import React from "react";
import { Link } from "react-router";
import styles from "./SidebarItem.module.css";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  link?: string;
  isSelected?: boolean;
  isVisible?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  text,
  isSelected,
  isVisible,
  link = "",
  onClick,
}: SidebarItemProps & { onClick: () => void }) => {
  return (
    <div
      className={`${styles.sidebarItemContainer} ${
        isSelected ? styles.selected : ""
      } ${isVisible ? "" : styles.collapse}`}
    >
      <li>
        <Link
          to={`/${link}`}
          className={styles.sidebarItem}
          onClick={onClick}
          title={text}
        >
          <div
            className={`${styles.sidebarIcon} ${
              isSelected ? styles.selected : ""
            }`}
          >
            {icon}
          </div>
          <p
            className={`${styles.sidebarText} ${
              isSelected ? styles.selected : ""
            } ${isVisible ? "" : styles.collapse}`}
          >
            {text}
          </p>
        </Link>
      </li>
    </div>
  );
};

export default SidebarItem;
