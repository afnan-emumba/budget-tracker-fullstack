import { Card, Divider, Input, Button, DatePicker, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { RootState } from "../../redux/store";
import { updateUser } from "../../redux/slices/usersSlice";
import { profileValidationSchema } from "../../utils/validation";
import styles from "./EditProfile.module.css";
import { useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

const EditProfile = ({
  onSwitchTab,
  showAlert,
}: {
  onSwitchTab: () => void;
  showAlert: () => void;
}) => {
  const users = useSelector((state: RootState) => state.user.users);
  const loggedInUser = users.find((user) => user.isLoggedIn);
  const [profilePicture, setProfilePicture] = useState(
    loggedInUser?.profilePicture || ""
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture("");
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: loggedInUser?.firstName || "",
      middleName: loggedInUser?.middleName || "",
      lastName: loggedInUser?.lastName || "",
      streetAddress: loggedInUser?.streetAddress || "",
      city: loggedInUser?.city || "",
      state: loggedInUser?.state || "",
      zipCode: loggedInUser?.zipCode || "",
      phoneNumber: loggedInUser?.phoneNumber || "",
      email: loggedInUser?.email || "",
      website: loggedInUser?.website || "",
      dateOfBirth: loggedInUser?.dateOfBirth || "",
      education: loggedInUser?.education || "",
      gender: loggedInUser?.gender || "",
      aboutMe: loggedInUser?.aboutMe || "",
      budgetLimit: loggedInUser?.budgetLimit || 0,
    },
    validationSchema: profileValidationSchema,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        profilePicture,
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
          : "",
      };
      console.log("Form values:", formattedValues);
      if (loggedInUser) {
        dispatch(
          updateUser({
            ...loggedInUser,
            ...formattedValues,
          })
        );
        showAlert();
        window.scrollTo({ top: 0, behavior: "smooth" });
        onSwitchTab();
      }
    },
  });

  const onCancel = () => {
    onSwitchTab();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.editProfileSection}>
      <form onSubmit={formik.handleSubmit}>
        <Card className={styles.editProfileCard} title='My Account'>
          <div className={styles.section}>
            <h3>Name & Job</h3>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor='firstName'>First Name</label>
                <Input
                  id='firstName'
                  name='firstName'
                  placeholder='First Name'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className={styles.error}>{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='middleName'>Middle Name</label>
                <Input
                  id='middleName'
                  name='middleName'
                  placeholder='Middle Name'
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.middleName && formik.errors.middleName ? (
                  <div className={styles.error}>{formik.errors.middleName}</div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='lastName'>Last Name</label>
                <Input
                  id='lastName'
                  name='lastName'
                  placeholder='Last Name'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className={styles.error}>{formik.errors.lastName}</div>
                ) : null}
              </div>
            </div>
          </div>
          <Divider />
          <div className={styles.section}>
            <h3>Address</h3>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor='streetAddress'>Street Address</label>
                <Input
                  id='streetAddress'
                  name='streetAddress'
                  placeholder='Street'
                  value={formik.values.streetAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.streetAddress && formik.errors.streetAddress ? (
                  <div className={styles.error}>
                    {formik.errors.streetAddress}
                  </div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='city'>City</label>
                <Input
                  id='city'
                  name='city'
                  placeholder='City'
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className={styles.error}>{formik.errors.city}</div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='state'>State</label>
                <Input
                  id='state'
                  name='state'
                  placeholder='State'
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.state && formik.errors.state ? (
                  <div className={styles.error}>{formik.errors.state}</div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='zipCode'>Zip Code</label>
                <Input
                  id='zipCode'
                  name='zipCode'
                  placeholder='Zip Code'
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.zipCode && formik.errors.zipCode ? (
                  <div className={styles.error}>{formik.errors.zipCode}</div>
                ) : null}
              </div>
            </div>
          </div>
          <Divider />
          <div className={styles.section}>
            <h3>Contact Info</h3>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className={styles.error}>
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='email'>Email</label>
                <Input
                  id='email'
                  name='email'
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.error}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='website'>Website</label>
                <Input
                  id='website'
                  name='website'
                  placeholder='Website'
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.website && formik.errors.website ? (
                  <div className={styles.error}>{formik.errors.website}</div>
                ) : null}
              </div>
            </div>
          </div>
          <Divider />
          <div className={styles.section}>
            <h3>Bio</h3>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor='dateOfBirth'>Date of Birth</label>
                <DatePicker
                  id='dateOfBirth'
                  name='dateOfBirth'
                  placeholder='Date of Birth'
                  value={
                    formik.values.dateOfBirth
                      ? dayjs(formik.values.dateOfBirth)
                      : null
                  }
                  onChange={(dateString) =>
                    formik.setFieldValue("dateOfBirth", dateString)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <div className={styles.error}>
                    {formik.errors.dateOfBirth}
                  </div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='education'>Education</label>
                <Input
                  id='education'
                  name='education'
                  placeholder='Education'
                  value={formik.values.education}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.education && formik.errors.education ? (
                  <div className={styles.error}>{formik.errors.education}</div>
                ) : null}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor='gender'>Gender</label>
                <Select
                  id='gender'
                  placeholder='Gender'
                  value={formik.values.gender}
                  onChange={(value) => formik.setFieldValue("gender", value)}
                  onBlur={formik.handleBlur}
                >
                  <Option value='male'>Male</Option>
                  <Option value='female'>Female</Option>
                  <Option value='rather_not_say'>Rather not say</Option>
                </Select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className={styles.error}>{formik.errors.gender}</div>
                ) : null}
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor='aboutMe'>About Me</label>
                <TextArea
                  id='aboutMe'
                  name='aboutMe'
                  rows={3}
                  placeholder='About me'
                  value={formik.values.aboutMe}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.aboutMe && formik.errors.aboutMe ? (
                  <div className={styles.error}>{formik.errors.aboutMe}</div>
                ) : null}
              </div>
            </div>
          </div>
          <Divider />
          <div className={styles.section}>
            <h3>Financial Information</h3>
            <div className={styles.inputRow}>
              <div>
                <label htmlFor='budgetLimit'>Budget (PKR)</label>
                <Input
                  id='budgetLimit'
                  name='budgetLimit'
                  placeholder='Budget'
                  value={formik.values.budgetLimit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.budgetLimit && formik.errors.budgetLimit ? (
                  <div className={styles.error}>
                    {formik.errors.budgetLimit}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Divider />
          <div className={styles.section}>
            <h3>Profile Picture</h3>
            <div className={styles.inputRow}>
              <div className={styles.profileGroup}>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  style={{}}
                />
                {profilePicture && (
                  <>
                    <img
                      src={profilePicture}
                      alt='Profile'
                      className={styles.profilePicture}
                    />
                    <Button
                      color='danger'
                      variant='solid'
                      style={{
                        width: "50%",
                      }}
                      onClick={handleRemovePicture}
                    >
                      Remove Picture
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <Divider />
          <div className={styles.buttonRow}>
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
            <Button type='text' onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditProfile;
