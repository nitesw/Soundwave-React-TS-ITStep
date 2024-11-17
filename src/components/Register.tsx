import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Spin } from "antd";
import { RegisterFields } from "../models/accounts";
import { accountsService } from "../services/accounts.service";
import { Link, useNavigate } from "react-router-dom";
import { tokenService } from "../services/token.service";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (tokenService.isAuthenticated()) {
      navigate("/profile");
    }
  }, [navigate]);

  const onFinish: FormProps<RegisterFields>["onFinish"] = (values) => {
    setLoading(true);
    accountsService
      .register(values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success("User registered successfully!");
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.response.data.detail);
      });
  };
  return (
    <>
      <Spin spinning={loading}>
        {tokenService.isAuthenticated() ? (
          <div>
            <h2>Redirecting to Profile...</h2>
          </div>
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>Create a New Account</h1>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<RegisterFields>
                label="Username"
                name="userName"
                rules={[
                  {
                    required: true,
                    min: 5,
                    message: "Username must be at least 5 characters long!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<RegisterFields>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<RegisterFields>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Link to="/login">
                <div style={{ textAlign: "center", margin: "16px" }}>
                  Already have an account? Log in here!
                </div>
              </Link>
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Register;
