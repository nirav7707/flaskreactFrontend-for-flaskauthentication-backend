import "./App.css";
import HeaderComponent from "./Component/HeaderComponent";
import ContentComponent from "./Component/ContentComponent";
import FooterComponent from "./Component/FooterComponent";
import { useState } from "react";
import AuthContext from "./authContext/authContext";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      <div className="App">
        <HeaderComponent />
        <ContentComponent />
        <FooterComponent />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
