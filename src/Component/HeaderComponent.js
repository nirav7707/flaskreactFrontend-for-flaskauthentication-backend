import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { authenticate } from "../services/authentication";
import AuthContext from "../authContext/authContext";

export default function HeaderComponent(props) {
  const { Header } = Layout;
  const auth = useContext(AuthContext);

  function handleLogout() {
    authenticate.signout();
    auth.setAuth(!auth.auth);
  }

  return (
    <Header className="container_header_component">
      {authenticate.checkAuthenticate() && (
        <Button type="primary" className="header_button" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Header>
  );
}
