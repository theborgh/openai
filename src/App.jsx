import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Homepage from "./pages/Homepage/Homepage";
import Dalle from "./pages/Dalle/Dalle";
import Davinci from "./pages/Davinci/Davinci";
import "./index.scss";

function App() {
  return (
    <Router>
      <div id="container">
        <Header />
        <div id="body">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/dalle" element={<Dalle />} />
            <Route path="/davinci" element={<Davinci />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
