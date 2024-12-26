import { Card } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./ProfileDetails.module.css";

const ProfileDetails = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const loggedInUser = users.find((user) => user.isLoggedIn);

  return (
    <div className={styles.profileSection}>
      <Card className={styles.profileCard} title='About Me'>
        <p>
          {loggedInUser?.aboutMe || "No information available about the user."}
        </p>
      </Card>
      <Card className={styles.profileCard} title='Personal Details'>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: "16rem",
            paddingBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {loggedInUser?.firstName && loggedInUser?.lastName && (
              <div>
                <p>Full Name</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.firstName} {loggedInUser.middleName}{" "}
                  {loggedInUser.lastName}
                </p>
              </div>
            )}
            {loggedInUser?.gender && (
              <div>
                <p>Gender</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.gender === "male"
                    ? "Male"
                    : loggedInUser.gender === "female"
                    ? "Female"
                    : "Rather not say"}
                </p>
              </div>
            )}
            {loggedInUser?.email && (
              <div>
                <p>Email</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.email}
                </p>
              </div>
            )}
            {loggedInUser?.education && (
              <div>
                <p>Education</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.education}
                </p>
              </div>
            )}
            {loggedInUser?.streetAddress && (
              <div>
                <p>Address</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.streetAddress}
                </p>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {loggedInUser?.phoneNumber && (
              <div>
                <p>Phone</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.phoneNumber}
                </p>
              </div>
            )}
            {loggedInUser?.zipCode && (
              <div>
                <p>Zip Code</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.zipCode}
                </p>
              </div>
            )}
            {loggedInUser?.dateOfBirth && (
              <div>
                <p>Date of Birth</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.dateOfBirth}
                </p>
              </div>
            )}
            {loggedInUser?.budgetLimit && (
              <div>
                <p>Budget Limit</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {loggedInUser.budgetLimit} PKR
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDetails;
