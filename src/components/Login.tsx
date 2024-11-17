import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Spin } from "antd";
import { LoginFields } from "../models/accounts";
import { accountsService } from "../services/accounts.service";
import { Link, useNavigate } from "react-router-dom";
import { tokenService } from "../services/token.service";
import { useAccountContext } from "../contexts/accounts.context";

const Login: React.FC = () => {
  const { setAccount } = useAccountContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (tokenService.isAuthenticated()) {
      navigate("/profile");
    }
  }, [navigate]);

  const onFinish: FormProps<LoginFields>["onFinish"] = (values) => {
    setLoading(true);
    accountsService
      .login(values)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          tokenService.save(res.data.token);
          setAccount(res.data.token);
          message.success("Successfully logged in!");
          navigate("/");
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
            <h1 style={{ textAlign: "center" }}>Log in to Your Account</h1>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<LoginFields>
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
              <Form.Item<LoginFields>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Link to="/register">
                <div style={{ textAlign: "center", margin: "16px" }}>
                  Don't have an account? Sign up now!
                </div>
              </Link>
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Login;
