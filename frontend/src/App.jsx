import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Homepage from "./pages/Homepage/Homepage";
import Dalle from "./pages/Dalle/Dalle";
import Davinci from "./pages/Davinci/Davinci";
import "./index.scss";
import SignUp from "./pages/Register/Register";
import LogIn from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserSettings from "./pages/UserSettings/UserSettings";
import jwt_decode from "jwt-decode";

const App = () => {
  const [user, setUser] = useState({
    displayName:
      sessionStorage.getItem("jwt") &&
      jwt_decode(sessionStorage.getItem("jwt")).displayName,
    email:
      sessionStorage.getItem("jwt") &&
      jwt_decode(sessionStorage.getItem("jwt")).email,
    photoURL:
      sessionStorage.getItem("jwt") &&
      jwt_decode(sessionStorage.getItem("jwt")).photoURL,
    openaiApiKey:
      sessionStorage.getItem("jwt") &&
      jwt_decode(sessionStorage.getItem("jwt")).openaiApiKey,
  });

  const handleUpdateUser = (updatedUserData) => {
    setUser({ ...user, ...updatedUserData });
  };

  const handleUpdateKey = (newKey) => {
    setUser({ ...user, openaiApiKey: newKey });
  };

  return (
    <Router>
      <div id="container">
        <Header user={user} updateUser={handleUpdateUser} />
        <div id="body">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/dalle" element={<Dalle user={user} />} />
            <Route path="/davinci" element={<Davinci user={user} />} />
            <Route
              path="/register"
              element={<SignUp updateUser={handleUpdateUser} />}
            />
            <Route
              path="/login"
              element={<LogIn updateUser={handleUpdateUser} />}
            />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route
              path="/settings"
              element={
                <UserSettings
                  user={user}
                  updateKey={handleUpdateKey}
                  updateUser={handleUpdateUser}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
