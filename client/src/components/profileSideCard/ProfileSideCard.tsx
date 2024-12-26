import { useSelector } from "react-redux";
import { Card, Divider } from "antd";
import { RootState } from "../../redux/store";
import {
  PhoneIcon,
  MailIcon,
  LocationIcon,
  LinkIcon,
} from "../../assets/icons";
import Placeholder from "../../assets/images/placeholder_avatar.jpg";
import styles from "./ProfileSideCard.module.css";

const ProfileSideCard = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const loggedInUser = users.find((user) => user.isLoggedIn);

  return (
    <Card
      className={styles.profileCard}
      style={{
        height: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: 200,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={loggedInUser?.profilePicture || Placeholder}
            alt='avatar'
            className={styles.avatar}
          />
          <h3>
            {loggedInUser?.firstName} {loggedInUser?.lastName}
          </h3>
        </div>
        <Divider style={{ width: "100%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "15px",
          }}
        >
          {loggedInUser?.phoneNumber && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <PhoneIcon />
              <p>{loggedInUser.phoneNumber}</p>
            </div>
          )}
          {loggedInUser?.email && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <MailIcon />
              <p>{loggedInUser.email}</p>
            </div>
          )}
          {(loggedInUser?.city || loggedInUser?.state) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <LocationIcon />
              <p>
                {loggedInUser.city && `${loggedInUser.city}, `}
                {loggedInUser.state && `${loggedInUser.state}`}
              </p>
            </div>
          )}
          {loggedInUser?.website && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <LinkIcon />
              <p>{loggedInUser.website}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileSideCard;
