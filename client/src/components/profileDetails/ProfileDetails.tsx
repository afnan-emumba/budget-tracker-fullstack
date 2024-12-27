import { Card } from "antd";
import { User } from "../../utils/interfaces";
import styles from "./ProfileDetails.module.css";

interface ProfileProps {
  userData: User | null;
}

const ProfileDetails = ({ userData }: ProfileProps) => {
  return (
    <div className={styles.profileSection}>
      <Card className={styles.profileCard} title='About Me'>
        <p>{userData?.aboutMe || "No information available about the user."}</p>
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
            {userData?.firstName && userData?.lastName && (
              <div>
                <p>Full Name</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.firstName} {userData.middleName} {userData.lastName}
                </p>
              </div>
            )}
            {userData?.gender && (
              <div>
                <p>Gender</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.gender === "male"
                    ? "Male"
                    : userData.gender === "female"
                    ? "Female"
                    : "Rather not say"}
                </p>
              </div>
            )}
            {userData?.email && (
              <div>
                <p>Email</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.email}
                </p>
              </div>
            )}
            {userData?.education && (
              <div>
                <p>Education</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.education}
                </p>
              </div>
            )}
            {userData?.streetAddress && (
              <div>
                <p>Address</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.streetAddress}
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
            {userData?.phoneNumber && (
              <div>
                <p>Phone</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.phoneNumber}
                </p>
              </div>
            )}
            {userData?.zipCode && (
              <div>
                <p>Zip Code</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.zipCode}
                </p>
              </div>
            )}
            {userData?.dateOfBirth && (
              <div>
                <p>Date of Birth</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.dateOfBirth}
                </p>
              </div>
            )}
            {userData?.budgetLimit && (
              <div>
                <p>Budget Limit</p>
                <p style={{ color: "#2B2B2B", fontWeight: "600" }}>
                  {userData.budgetLimit} PKR
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
