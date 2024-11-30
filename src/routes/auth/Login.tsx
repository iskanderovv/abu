import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

import loginImage from "@/images/login.png";
import logo from "@/images/logo.svg";
import { FieldType } from "../../types";
import Title from "antd/es/typography/Title";
import authLogin from "../../api/auth-login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await authLogin(values);
      if (res.success) {
        navigate("/contracts");
        localStorage.setItem("accessToken", res.data.accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex h-screen gap-x-[80px]">
      <img
        src={loginImage}
        className="w-[600px] object-cover"
        alt="Najot Ta'lim image"
      />
      <div className="w-[60%] flex flex-col pt-[60px]">
        <img src={logo} className="w-[250px]" alt="Najot Ta'lim logo" />
        <div className="mt-[150px]">
          <h2 className="font-medium text-[32px] pb-[32px]">
            Tizimga kirish
          </h2>
          <Form
            name="basic"
            style={{ maxWidth: 380 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="flex flex-col"
          >
            <div>
              <Title level={5}>Login</Title>
              <Form.Item<FieldType>
                name="login"
                labelAlign="left"
                rules={[
                  { required: true, message: "Parol yoki loginda xatolik!" },
                ]}
              >
                <Input size="large" placeholder="Loginni kiriting..." />
              </Form.Item>
            </div>

            <div>
              <Title level={5}>Parol</Title>
              <Form.Item<FieldType>
                rules={[
                  { required: true, message: "Parol yoki loginda xatolik!" },
                ]}
                name="password"
                labelAlign="left"
                labelCol={{ span: 24 }}
              >
                <Input.Password
                  size="large"
                  placeholder="Parolni kiriting..."
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                size="large"
                className="w-full mt-8 py-3 bg-[#0EB182]"
                type="primary"
                htmlType="submit"
              >
                Kirish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
