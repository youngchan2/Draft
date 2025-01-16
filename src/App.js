import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Draft from "./components/draft";
import Formation from "./components/formation";
import Soccer from "./components/soccerfield";
import Futsal from "./components/futsalfield";
import Rift from "./components/Rift";
import Draw from "./components/draw";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register/:option" element={<Register/>}></Route>
        <Route path="/register/:option/draft" element={<Draft/>}></Route>
        <Route path="/register/:option/draft/formation" element={<Formation />}></Route>
        <Route path="/soccer" element={<Soccer/>}></Route>
        <Route path="/futsal" element={<Futsal/>}></Route>
        <Route path="/rift" element={<Rift/>}></Route>
        <Route path="/draw" element={<Draw/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
