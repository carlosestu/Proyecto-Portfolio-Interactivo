import React from "react";
import contenidosIndice from "../../InfoGeneral/ContenidosPortfolio";
import "./portada-css/retos.css";
import { useState } from "react";

function Retos() {
  const reto1 = contenidosIndice[4].reto1;
  const reto2 = contenidosIndice[4].reto2;
  const reto3 = contenidosIndice[4].reto3;
  const [tituloReto, setTituloReto] = useState(reto3);
  const [descripcionReto, setDescripcionReto] = useState(contenidosIndice[4].descripcion1);
  const anteriorReto = () => {
    if (tituloReto === reto3) {
      setTituloReto(reto2);
      setDescripcionReto(contenidosIndice[4].descripcion2);
    } else if (tituloReto === reto2) {
      setTituloReto(reto1);
      setDescripcionReto(contenidosIndice[4].descripcion1);
    } else if (tituloReto === reto1) {
      setTituloReto(reto3);
      setDescripcionReto(contenidosIndice[4].descripcion3);
    }
  };

  const siguienteReto = () => {
    if (tituloReto === reto1) {
      setTituloReto(reto2);
      setDescripcionReto(contenidosIndice[4].descripcion2);
    } else if (tituloReto === reto2) {
      setTituloReto(reto3);
      setDescripcionReto(contenidosIndice[4].descripcion3);
    } else if (tituloReto === reto3) {
      setTituloReto(reto1);
      setDescripcionReto(contenidosIndice[4].descripcion1);
    }
  };
  return (
    <div id="retos-soluciones" className="retos-soluciones">
      <h2>{contenidosIndice[4].titulo}</h2>
      <h3>{tituloReto}:</h3>
      <div className="descripcionReto">
        <button onClick={anteriorReto} className="buttonRetos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="300px"
            viewBox="0 -960 960 960"
            width="60px"
            fill="#000000"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
        <textarea readOnly value={descripcionReto} className="retos"></textarea>
        <button onClick={siguienteReto} className="buttonRetos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="300px"
            viewBox="0 -960 960 960"
            width="60px"
            fill="#000000"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Retos;
