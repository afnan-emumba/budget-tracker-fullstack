import { Card, Divider } from "antd";
import {
  PhoneIcon,
  MailIcon,
  LocationIcon,
  LinkIcon,
} from "../../assets/icons";
import { User } from "../../utils/interfaces";
import Placeholder from "../../assets/images/placeholder_avatar.jpg";
import styles from "./ProfileSideCard.module.css";

interface ProfileProps {
  userData: User | null;
}

const ProfileSideCard = ({ userData }: ProfileProps) => {
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
            src={userData?.profilePicture || Placeholder}
            alt='avatar'
            className={styles.avatar}
          />
          <h3>
            {userData?.firstName} {userData?.lastName}
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
          {userData?.phoneNumber && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <PhoneIcon />
              <p>{userData.phoneNumber}</p>
            </div>
          )}
          {userData?.email && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <MailIcon />
              <p>{userData.email}</p>
            </div>
          )}
          {(userData?.city || userData?.state) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <LocationIcon />
              <p>
                {userData.city && `${userData.city}, `}
                {userData.state && `${userData.state}`}
              </p>
            </div>
          )}
          {userData?.website && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <LinkIcon />
              <p>{userData.website}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileSideCard;
