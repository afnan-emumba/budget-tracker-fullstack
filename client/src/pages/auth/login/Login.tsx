import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { Form, Input, Button, Checkbox, Flex } from "antd";
import { EmailIcon, EyeIcon, EyeOnIcon } from "../../../assets/icons";
import loginImage from "../../../assets/images/login-illustration.png";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useUser } from "../../../context/UserContext";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const { setUserID } = useUser();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      // const response = await axios.post(`${baseUrl}/auth/login`, values);
      const response = await axios.post(`${baseUrl}/auth/login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // If cookies are required
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        const userId = response.data._id;
        console.log(userId);
        setUserID(userId);
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <Helmet>
        <title>Login | Budget Tracker</title>
      </Helmet>

      <div className={styles.loginForm}>
        <div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to Budget Tracker</p>
        </div>

        <Form
          name='login'
          initialValues={{ remember: true }}
          layout='vertical'
          requiredMark='optional'
          onFinish={handleLogin}
        >
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input suffix={<EmailIcon />} placeholder='test@gmail.com' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
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
              type={passwordVisible ? "text" : "password"}
              placeholder='Enter your password'
            />
          </Form.Item>
          <Form.Item>
            <Flex
              justify='space-between'
              align='center'
              style={{ marginTop: "-0.5rem" }}
            >
              <Form.Item name='remember' valuePropName='unchecked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to={"/reset-password"}>Forgot password?</Link>
            </Flex>
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
              Log in
            </Button>
            <div style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Link to={"/signup"} style={{ fontWeight: "600" }}>
                Sign Up
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.verticalLine} />
      <img src={loginImage} alt='login' className={styles.loginImage} />
    </div>
  );
};

export default Login;
