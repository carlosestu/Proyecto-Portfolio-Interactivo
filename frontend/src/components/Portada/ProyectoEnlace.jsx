import React from 'react'
import "./portada-css/referencia.css";
import contenidosIndice from '../../InfoGeneral/ContenidosPortfolio'
import { useNavigate } from 'react-router-dom';

function ProyectoEnlace() {
  const navigate = useNavigate();
  return (
    <div id='proyecto-de-referencia' className='proyecto-de-referencia'>
    <h2>{contenidosIndice[5].titulo}</h2>
    <textarea readOnly value={contenidosIndice[5].descripcion} className='texto-introductivo-referencia'></textarea>
    <button onClick={() => navigate("login")} className='enlace-referencia'>Click aquí para navergar al proyecto</button>
    </div>
  )
}

export default ProyectoEnlace;