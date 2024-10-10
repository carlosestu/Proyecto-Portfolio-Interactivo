import React from 'react'
import contenidosIndice from "../../InfoGeneral/ContenidosPortfolio"

function Trayectoria() {
  return (
    <div id='trayectoria'>
    <h2>{contenidosIndice[1].titulo}</h2>
    <textarea readOnly value={contenidosIndice[1].descripcion} className="trayectoria-Descripcion"></textarea>
    </div>
  )
}

export default Trayectoria;