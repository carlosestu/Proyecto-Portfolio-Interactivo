import React from 'react';
import contenidosIndice from '../../InfoGeneral/ContenidosPortfolio';

function ProyectosRealizados() {
    return (
        <div id='proyectos-realizados'>
        <h2>{contenidosIndice[2].titulo}</h2>
        <textarea readOnly value={contenidosIndice[2].descripcion1} className="proyectos-realizados-Descripcion"></textarea>
        </div>
      )
}


export default ProyectosRealizados