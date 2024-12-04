import React from 'react'
import "./portada-css/referencia.css";
import contenidosIndice from '../../InfoGeneral/ContenidosPortfolio'

function ProyectoEnlace() {
  return (
    <div id='proyecto-de-referencia' className='proyecto-de-referencia'>
    <h2>{contenidosIndice[5].titulo}</h2>
    <textarea readOnly value={contenidosIndice[5].descripcion} className='texto-introductivo-referencia'></textarea>
    <button className='enlace-referencia'>Click aquí para navergar al proyecto</button>
    </div>
  )
}

export default ProyectoEnlace;