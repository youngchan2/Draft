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
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>}></Route>
        <Route path={`${process.env.PUBLIC_URL}/register/:option`} element={<Register/>}></Route>
        <Route path={`${process.env.PUBLIC_URL}/register/:option/draft`} element={<Draft/>}></Route>
        <Route path={`${process.env.PUBLIC_URL}/register/:option/draft/formation`} element={<Formation />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/soccer`} element={<Soccer/>}></Route>
        <Route path={`${process.env.PUBLIC_URL}/futsal`} element={<Futsal/>}></Route>
        <Route path={`${process.env.PUBLIC_URL}/rift`} element={<Rift/>}></Route>
        <Route path={`${process.env.PUBLIC_URL}/draw`} element={<Draw/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
