import React from 'react'
import contenidosIndice from '../../InfoGeneral/ContenidosPortfolio'
import './portada-css/aptitudes.css'
import DescripcionOverlay from "./Proyectos-Descipcion";
import { useEffect, useState } from 'react';

function Aptitudes() {
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState(null);

  const mostrarDescripcion = (tipo, indice) => {
    const claveDescripcion = `descripcion${tipo}${indice}`;
    setDescripcionSeleccionada(contenidosIndice[3][claveDescripcion]);
    }
  const ocultarDescripcion = () => {
    setDescripcionSeleccionada(null);
  };
  return (
    <div id='aptitudes-tecnologias' className="aptitudes-container">
      <h2>{contenidosIndice[3].titulo}</h2>
      <textarea readOnly value={contenidosIndice[3].descripcion} className="aptitudes-Descripcion"></textarea>
      <div className="aptitudes-content">
        <div className="aptitudes-section">
          <h3>Habilidades</h3>
          <ul className="skills-list">
            <li onClick={() => mostrarDescripcion('h', 1)}><span className="skill-tag">{contenidosIndice[3].habilidad1}</span></li>
            <li onClick={() => mostrarDescripcion('h', 2)}><span className="skill-tag">{contenidosIndice[3].habilidad2}</span></li>
            <li onClick={() => mostrarDescripcion('h', 3)}><span className="skill-tag">{contenidosIndice[3].habilidad3}</span></li>
            <li onClick={() => mostrarDescripcion('h', 4)}><span className="skill-tag">{contenidosIndice[3].habilidad4}</span></li>
            <li onClick={() => mostrarDescripcion('h', 5)}><span className="skill-tag">{contenidosIndice[3].habilidad5}</span></li>
          </ul>
        </div>
        <div className="aptitudes-section">
          <h3>Tecnologías</h3>
          <ul className="tech-list">
            <li onClick={() => mostrarDescripcion('t', 1)}><span className="tech-tag">{contenidosIndice[3].tecnologia1}</span></li>
            <li onClick={() => mostrarDescripcion('t', 2)}><span className="tech-tag">{contenidosIndice[3].tecnologia2}</span></li>
            <li onClick={() => mostrarDescripcion('t', 3)}><span className="tech-tag">{contenidosIndice[3].tecnologia3}</span></li>
            <li onClick={() => mostrarDescripcion('t', 4)}><span className="tech-tag">{contenidosIndice[3].tecnologia4}</span></li>
            <li onClick={() => mostrarDescripcion('t', 5)}><span className="tech-tag">{contenidosIndice[3].tecnologia5}</span></li>
            <li onClick={() => mostrarDescripcion('t', 6)}><span className="tech-tag">{contenidosIndice[3].tecnologia6}</span></li>
            <li onClick={() => mostrarDescripcion('t', 7)}><span className="tech-tag">{contenidosIndice[3].tecnologia7}</span></li>
            <li onClick={() => mostrarDescripcion('t', 8)}><span className="tech-tag">{contenidosIndice[3].tecnologia8}</span></li>
          </ul>
        </div>
      </div>
      {descripcionSeleccionada !== null && (
        <DescripcionOverlay 
          descripcion={descripcionSeleccionada}
          onClose={ocultarDescripcion}
        />
      )}
    </div>
  )
}

export default Aptitudes