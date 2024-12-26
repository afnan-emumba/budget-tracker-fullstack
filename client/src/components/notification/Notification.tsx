import {
  AddNotificationIcon,
  UpdateNotificationIcon,
  DeleteNotificationIcon,
} from "../../assets/icons";
import styles from "./Notification.module.css";

interface NotificationProps {
  icon: string;
  expenseTitle: string;
  message: string;
  timestamp: number;
}

const Notification = ({
  icon,
  expenseTitle,
  message,
  timestamp,
}: NotificationProps) => {
  const getIcon = () => {
    switch (icon) {
      case "add_icon":
        return <AddNotificationIcon />;
      case "update_icon":
        return <UpdateNotificationIcon />;
      case "delete_icon":
        return <DeleteNotificationIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>{expenseTitle}</h3>
          <p>{message}</p>
        </div>
        <div className={styles.timestamp}>
          <p>{new Date(timestamp).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
