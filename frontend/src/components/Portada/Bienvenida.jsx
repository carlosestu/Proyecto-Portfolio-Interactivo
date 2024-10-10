import React from "react";
import mensajeBienvenida from "../../InfoGeneral/bienvenida";


function Bienvenida() {
  return (
    <div className="bienvenida">
      <h2 className="titulo-mensajeBienvenida">{mensajeBienvenida.titulo}</h2>
      <textarea readOnly value={mensajeBienvenida.mensaje} className="textoBienvenida"></textarea>
      
    </div>
  );
}

export default Bienvenida;
