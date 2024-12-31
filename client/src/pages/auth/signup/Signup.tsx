import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router";
import { Form, Input, Button } from "antd";
import axios from "axios";
import signupImage from "../../../assets/images/signup-illustration.png";
import { EmailIcon, EyeIcon, EyeOnIcon } from "../../../assets/icons";
import { useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../../../utils/validation";
import styles from "./Signup.module.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      budgetLimit: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...submitValues } = values;

      Object.keys(submitValues).forEach((key) => {
        (submitValues as any)[key] = (submitValues as any)[key].toString();
      });

      try {
        const response = await axios.post(`${baseUrl}/users`, submitValues);
        if (response.status === 201) {
          navigate("/login");
        }
      } catch (error) {
        console.log((error as any).response);
        if (
          (error as any).response.data.message.includes("Email already exists")
        ) {
          console.log("Email already exists");
          setEmailExists(true);
        }
      }
    },
  });

  return (
    <div className={styles.signupPage}>
      <Helmet>
        <title>Sign Up | Budget Tracker</title>
      </Helmet>

      <div className={styles.signupForm}>
        <div>
          <h2>Sign Up</h2>
          <p>Welcome to our community</p>
        </div>

        <Form name='signup' layout='vertical' onFinish={formik.handleSubmit}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Form.Item
              label='First Name'
              style={{ flex: 1 }}
              validateStatus={
                formik.errors.firstName && formik.touched.firstName
                  ? "error"
                  : ""
              }
              help={
                formik.errors.firstName && formik.touched.firstName
                  ? formik.errors.firstName
                  : ""
              }
            >
              <Input
                name='firstName'
                placeholder='Cameron'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item
              label='Last Name'
              style={{ flex: 1 }}
              validateStatus={
                formik.errors.lastName && formik.touched.lastName ? "error" : ""
              }
              help={
                formik.errors.lastName && formik.touched.lastName
                  ? formik.errors.lastName
                  : ""
              }
            >
              <Input
                name='lastName'
                placeholder='Williamson'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </div>
          <Form.Item
            label='Email'
            validateStatus={
              (formik.errors.email && formik.touched.email) || emailExists
                ? "error"
                : ""
            }
            help={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : emailExists
                ? "Email already exists"
                : ""
            }
          >
            <Input
              name='email'
              suffix={<EmailIcon />}
              placeholder='test@gmail.com'
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e);
                setEmailExists(false);
              }}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label='Password'
            validateStatus={
              formik.errors.password && formik.touched.password ? "error" : ""
            }
            help={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""
            }
          >
            <Input
              name='password'
              type={passwordVisible ? "text" : "password"}
              suffix={
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {passwordVisible ? <EyeOnIcon /> : <EyeIcon />}
                </span>
              }
              placeholder='Enter your password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label='Confirm Password'
            validateStatus={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? "error"
                : ""
            }
            help={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
          >
            <Input
              name='confirmPassword'
              type={confirmPasswordVisible ? "text" : "password"}
              suffix={
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {confirmPasswordVisible ? <EyeOnIcon /> : <EyeIcon />}
                </span>
              }
              placeholder='Enter your password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label='Budget'
            validateStatus={
              formik.errors.budgetLimit && formik.touched.budgetLimit
                ? "error"
                : ""
            }
            help={
              formik.errors.budgetLimit && formik.touched.budgetLimit
                ? formik.errors.budgetLimit
                : ""
            }
          >
            <Input
              name='budgetLimit'
              type='number'
              placeholder='Enter amount'
              value={formik.values.budgetLimit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type='primary'
              htmlType='submit'
              style={{
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Sign Up
            </Button>
            <div style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to={"/login"} style={{ fontWeight: "600" }}>
                Log In
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.verticalLine} />
      <img src={signupImage} alt='signup' className={styles.signupImage} />
    </div>
  );
};

export default Signup;
