import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { Divider, Alert } from "antd";
import { BackArrowIcon } from "../../assets/icons";
import ProfileSideCard from "../../components/profileSideCard/ProfileSideCard";
import ProfileDetails from "../../components/profileDetails/ProfileDetails";
import EditProfile from "../../components/editProfile/EditProfile";
import styles from "./Profile.module.css";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSwitchTab = () => {
    setActiveTab("profile");
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e);
    setTimeout(() => {
      setAlertVisible(false);
    }, 300);
  };

  return (
    <>
      <Helmet>
        <title>Profile | Budget Tracker</title>
      </Helmet>

      <div className={styles.profileContent}>
        <div className={styles.header}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Link to={"/"}>
              <BackArrowIcon />
            </Link>
            <h2>Profile</h2>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <p
              className={`${styles.profileLink} ${
                activeTab === "profile" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </p>
            <p
              className={`${styles.profileLink} ${
                activeTab === "account" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("account")}
            >
              My account
            </p>
          </div>
        </div>
        <Divider />
        <div className={styles.profileCardsContainer}>
          <ProfileSideCard />
          {activeTab === "profile" && <ProfileDetails />}
          {activeTab === "account" && (
            <EditProfile
              onSwitchTab={handleSwitchTab}
              showAlert={() => setAlertVisible(true)}
            />
          )}
        </div>
      </div>

      {alertVisible && (
        <Alert
          message='Success!'
          description='Profile updated successfully.'
          type='success'
          showIcon
          closable
          onClose={onClose}
          className={styles.alert}
        />
      )}
    </>
  );
};

export default Profile;
