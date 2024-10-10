import React from 'react'
import contenidosIndice from "../../InfoGeneral/ContenidosPortfolio"

function SobreMí() {
  return (
    <div id='SobreMi'>
    <h2>{contenidosIndice[0].titulo}</h2>
    <textarea readOnly value={contenidosIndice[0].descripcion} className="sobreMi-Descripcion"></textarea>
    </div>
  )
}

export default SobreMí;