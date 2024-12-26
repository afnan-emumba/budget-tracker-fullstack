import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { Form, Input, Button } from "antd";
import forgotImage from "../../../assets/images/forgot-illustration.png";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  return (
    <div className={styles.forgotPage}>
      <Helmet>
        <title>Reset Your Password | Budget Tracker</title>
      </Helmet>

      <div className={styles.forgotForm}>
        <div>
          <h2>Reset Password</h2>
          <p>Enter your email for a reset link.</p>
        </div>

        <Form
          name='login'
          initialValues={{ remember: true }}
          layout='vertical'
          requiredMark='optional'
        >
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder='test@gmail.com' />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type='primary'
              htmlType='submit'
              style={{
                marginBottom: "0.5rem",
              }}
            >
              Send Reset Password Link
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
      <img src={forgotImage} alt='forgot' className={styles.forgotImage} />
    </div>
  );
};

export default ForgotPassword;
