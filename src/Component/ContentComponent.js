import React from "react";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import DashboardComponent from "./DashboardComponent";
import ProtectedRoute from "./ProtectedRoute";

export default function ContentComponent() {
  const { Content } = Layout;
  return (
    <Content className="container_content_component">
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/register" component={RegisterComponent} />
        <ProtectedRoute path="/dashboard" component={DashboardComponent} />
        <Redirect from="/" to="register" />
      </Switch>
    </Content>
  );
}
