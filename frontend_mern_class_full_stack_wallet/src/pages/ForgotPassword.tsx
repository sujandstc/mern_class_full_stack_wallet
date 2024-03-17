import { Button, Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/forgot-pw",
        values
      );

      navigate(`/reset-pw?email=${values.email}`);

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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="default" htmlType="submit">
              Send OTP
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

export default ForgotPassword;
