import React, { useState } from "react";
import config from "../config/config";
import http from "../services/http";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function RegisterComponent(props) {
  const [message, setMessage] = useState("");
  const [messagetype, setMessageType] = useState("");
  const onFinish = (values) => {
    var data = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      number: values.phone,
    };
    http
      .post(config.url + "/register", data)
      .then((res) => {
        if (res.data) {
          setMessage("Register successfully");
          setMessageType("success");
          setTimeout(() => {
            props.history.push("/login");
          }, 1000);
        }
      })
      .catch((ex) => {
        setMessage("Something goes wrong!, try Again");
        setMessageType("error");  
      });
  };
  return (
    <div className="loginForm">
      {message && <Alert message={message} type={messagetype} />}
      <h2>Sign up</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            { min: 8, message: "Password must be minimum 8 characters." },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
            { min: 10, message: "Number must be minimum 10 characters." },
            { max: 10, message: "Number must be minimum 10 characters." },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Phone"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
        Or <Link to="/login">signin now!</Link>
      </Form>
    </div>
  );
}
