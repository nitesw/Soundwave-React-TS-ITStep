import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { RegisterFields } from "../models/accounts";
import { accountsService } from "../services/accounts.service";
import { Link } from "react-router-dom";

const onFinish: FormProps<RegisterFields>["onFinish"] = (values) => {
  accountsService
    .register(values)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        message.success("User registered successfully!");
      }
    })
    .catch((err) => {
      console.log(err);
      message.error(err.response.data.detail);
    });
};

const Register: React.FC = () => (
  <>
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
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<RegisterFields>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
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
  </>
);

export default Register;
