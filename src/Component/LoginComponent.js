import React, { useState, useContext } from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { authenticate } from "../services/authentication";
import config from "../config/config";
import http from "../services/http";
import AuthContext from "../authContext/authContext";

export default function LoginComponent(props) {
  const [message, setMessage] = useState("");
  const [messagetype, setMessageType] = useState("");
  const auth = useContext(AuthContext);

  const onFinish = (values) => {
    var data = { email: values.username, password: values.password };
    http
      .post(config.url + "/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data) {
          authenticate.signin(res.data["token"]);
          setMessage("login successful");
          setMessageType("success");
          setTimeout(() => {
            props.history.push("/dashboard");
          }, 1000);
          setTimeout(() => {
            authenticate.signout();
          }, 300000);
          auth.setAuth(!auth.auth);
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
      <h2>Sign in</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
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
              message: "Please input your Password!",
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign in
          </Button>
          Or <Link to="/register">Signup now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
