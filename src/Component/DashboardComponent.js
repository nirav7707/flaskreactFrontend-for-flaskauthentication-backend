import React, { useEffect, useState } from "react";
import config from "../config/config";
import { authenticate } from "../services/authentication";
import http from "../services/http";

export default function DashboardComponent() {
  const [item, setItem] = useState({ firstname: "" });
  useEffect(async () => {
    try {
      const dashboard = await http.get(config.url, {
        headers: {
          "x-access-token": authenticate.getToken("token"),
        },
      });
      setItem(dashboard.data);
    } catch (ex) {
      console.log(ex);
    }
  }, []);
  return <div>Welcome, {item.firstname}!</div>;
}
