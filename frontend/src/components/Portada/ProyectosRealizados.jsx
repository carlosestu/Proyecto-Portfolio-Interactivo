import React from "react";
import contenidosIndice from "../../InfoGeneral/ContenidosPortfolio";

function ProyectosRealizados() {
  return (
    <div id="proyectos-realizados">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="carta-proyectos">
          <h2>
            {index == 0
              ? contenidosIndice[2].titulo1
              : index == 1
              ? contenidosIndice[2].titulo2
              : index == 2
              ? contenidosIndice[2].titulo3
              : console.error(
                  "Algo inesperado ha ocurrido, por favor, vuelva a intentarlo más tarde."
                )}
          </h2>
          <textarea
            readOnly
            value={
              index == 0
                ? contenidosIndice[2].descripcion1
                : index == 1
                ? contenidosIndice[2].descripcion2
                : index == 2
                ? contenidosIndice[2].descripcion3
                : console.error(
                    "Algo inesperado ha ocurrido, por favor, vuelva a intentarlo más tarde."
                  )
            }
            className="proyectos-realizados-Descripcion"
          ></textarea>
        </div>
      ))}
    </div>
  );
}

export default ProyectosRealizados;
