import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Draft from "./components/draft";
import Formation from "./components/formation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/register/draft" element={<Draft/>}></Route>
        <Route path="/register/draft/formation" element={<Formation />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
