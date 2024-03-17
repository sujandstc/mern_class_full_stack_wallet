import { Button, Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/reset-pw",
        { ...values, email: searchParams.get("email") }
      );

      navigate("/reset-pw");

      message.success("OTP sent successfully!");
    } catch (e: any) {
      if (e && e.response && e.response.data && e.response.data.message) {
        message.error(e.response.data.message);
      } else {
        message.error("Connection failed. Try again!");
      }
    }
  };

  return (
    <>
      <div className=" p-10">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="OTP"
            name="otp"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="New password"
            name="new_password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Confrim Password"
            name="confirm_password"
            rules={[{ required: true, message: "Please re-type password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="default" htmlType="submit">
              Reset password
            </Button>
          </Form.Item>
        </Form>
        <br />
        Go back to
        <Link className="text-blue-900 font-bold" to={"/login"}>
          <b> Login</b>
        </Link>
      </div>
    </>
  );
};

export default ResetPassword;
