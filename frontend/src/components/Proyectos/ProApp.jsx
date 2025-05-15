import React from 'react'
import { Route, Routes } from "react-router-dom";
import ProPortada from './ProPortada';
import Configuracion from './Configuracion';

function ProApp() {
  return (
    <div>
    <Routes>
            <Route path="/" element={<ProPortada />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
    </div>
  )
}

export default ProApp