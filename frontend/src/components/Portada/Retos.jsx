import React from 'react'
import contenidosIndice from '../../InfoGeneral/ContenidosPortfolio'
import './portada-css/retos.css'

function Retos() {
  return (
    <div id='retos-soluciones' className='retos-soluciones'>
    <h2>{contenidosIndice[4].titulo}</h2>
    <textarea readOnly value={contenidosIndice[0].descripcion} className="sobreMi-Descripcion"></textarea>
    </div>
  )
}

export default Retos