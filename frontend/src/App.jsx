import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PortadaApp from "./components/Portada/Portada-app";

export function App() {
  return (
    <div className="app">
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PortadaApp />} />
        </Routes>
      </div>
    </div>
  );
}