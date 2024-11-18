import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import TopNavBar from "./components/TopNavBar";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen navigate={navigate} />;
      case "create-account":
        return <CreateAccountScreen navigate={navigate} />;
      case "forgot-password":
        return <ForgotPasswordScreen navigate={navigate} />;
      case "home":
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <div>
      {currentScreen !== "login" && <TopNavBar navigate={navigate} />}
      <div style={{ marginTop: currentScreen !== "login" ? "95px" : "0" }}>
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
