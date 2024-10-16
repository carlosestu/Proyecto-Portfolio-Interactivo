import React, { useState } from "react";
import contenidosIndice from "../../InfoGeneral/ContenidosPortfolio";
import PORSCHE1 from "../../assets/PORSCHE1.png";
import PORSCHE2 from "../../assets/PORSCHE2.png";
import PORSCHE3 from "../../assets/PORSCHE3.png";
import PORSCHE4 from "../../assets/PORSCHE4.png";
import DOGGYSTICKERS1 from "../../assets/DOGGYSTICKERS1.png";
import DOGGYSTICKERS2 from "../../assets/DOGGYSTICKERS2.png";
import DOGGYSTICKERS3 from "../../assets/DOGGYSTICKERS3.png";
import DOGGYSTICKERS4 from "../../assets/DOGGYSTICKERS4.png";
import DOGGYSTICKERS5 from "../../assets/DOGGYSTICKERS5.png";
import FREELANCEHUB1 from "../../assets/FREELANCEHUB1.png";
import FREELANCEHUB2 from "../../assets/FREELANCEHUB2.png";
import FREELANCEHUB3 from "../../assets/FREELANCEHUB3.png";
import FREELANCEHUB4 from "../../assets/FREELANCEHUB4.png";
import FREELANCEHUB5 from "../../assets/FREELANCEHUB5.png";
import FREELANCEHUB6 from "../../assets/FREELANCEHUB6.png";
import FREELANCEHUB7 from "../../assets/FREELANCEHUB7.png";
import FREELANCEHUB8 from "../../assets/FREELANCEHUB8.png";
import FREELANCEHUB9 from "../../assets/FREELANCEHUB9.png";
import FREELANCEHUB10 from "../../assets/FREELANCEHUB10.png";
import FREELANCEHUB11 from "../../assets/FREELANCEHUB11.png";

function ProyectosRealizados() {
  const porsche = [PORSCHE1, PORSCHE2, PORSCHE3, PORSCHE4];
  const doggyStickers = [
    DOGGYSTICKERS1,
    DOGGYSTICKERS2,
    DOGGYSTICKERS3,
    DOGGYSTICKERS4,
    DOGGYSTICKERS5,
  ];
  const freelanceHub = [
    FREELANCEHUB1,
    FREELANCEHUB2,
    FREELANCEHUB3,
    FREELANCEHUB4,
    FREELANCEHUB5,
    FREELANCEHUB6,
    FREELANCEHUB7,
    FREELANCEHUB8,
    FREELANCEHUB9,
    FREELANCEHUB10,
    FREELANCEHUB11,
  ];
  const [imagenSeleccionadaPorsche, setImagenSeleccionadaPorsche] = useState(0);
  const [imagenSeleccionadaDoggy, setImagenSeleccionadaDoggy] = useState(0);
  const [imagenSeleccionadaFreelance, setImagenSeleccionadaFreelance] =
    useState(0);
  const anteriorImagen = (index) => {
    if (index === 0) {
      setImagenSeleccionadaPorsche((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (index === 1) {
      setImagenSeleccionadaDoggy((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (index === 2) {
      setImagenSeleccionadaFreelance((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const siguienteImagen = (index) => {
    if (index === 0) {
      setImagenSeleccionadaPorsche((prev) =>
        prev < porsche.length - 1 ? prev + 1 : prev
      );
    } else if (index === 1) {
      setImagenSeleccionadaDoggy((prev) =>
        prev < doggyStickers.length - 1 ? prev + 1 : prev
      );
    } else if (index === 2) {
      setImagenSeleccionadaFreelance((prev) =>
        prev < freelanceHub.length - 1 ? prev + 1 : prev
      );
    }
  };
  return (
    <div id="proyectos-realizados">
      <h2>Proyectos Realizados:</h2>
      <div className="contenedor">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="carta-proyectos">
            <h3>
              {index == 0
                ? contenidosIndice[2].titulo1
                : index == 1
                ? contenidosIndice[2].titulo2
                : index == 2
                ? contenidosIndice[2].titulo3
                : console.error(
                    "Algo inesperado ha ocurrido, por favor, vuelva a intentarlo más tarde."
                  )}
            </h3>
            <div className="imagen-proyecto">
              {index == 0 ? (
                imagenSeleccionadaPorsche !== 0 ? (
                  <button onClick={() => anteriorImagen(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="300px"
                    viewBox="0 -960 960 960"
                    width="50px"
                    fill="#000000"
                  >
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                  </svg>
                  </button>
                ) : (
                  <button>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="300px"
                  viewBox="0 -960 960 960"
                  width="50px"
                  fill="#000000"
                >
                  <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>
                  </button>
                )
              ) : index == 1 ? (
                imagenSeleccionadaDoggy !== 0 ? (
                  <button onClick={() => anteriorImagen(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="300px"
                    viewBox="0 -960 960 960"
                    width="50px"
                    fill="#000000"
                  >
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                  </svg>
                  </button>
                ) : (
                  <button>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="300px"
                  viewBox="0 -960 960 960"
                  width="50px"
                  fill="#000000"
                >
                  <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>
                  </button>
                )
              ) : index == 2 ? (
                imagenSeleccionadaFreelance !== 0 ? (
                  <button onClick={() => anteriorImagen(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="300px"
                    viewBox="0 -960 960 960"
                    width="50px"
                    fill="#000000"
                  >
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                  </svg>
                  </button>
                ) : (
                  <button>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="300px"
                  viewBox="0 -960 960 960"
                  width="50px"
                  fill="#000000"
                >
                  <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>
                  </button>
                )
              ) : (
                console.error(
                  "Algo inesperado ha ocurrido, por favor, vuelva a intentarlo más tarde."
                )
              )}
              <img
                src={
                  index == 0
                    ? porsche[imagenSeleccionadaPorsche]
                    : index == 1
                    ? doggyStickers[imagenSeleccionadaDoggy]
                    : index == 2
                    ? freelanceHub[imagenSeleccionadaFreelance]
                    : console.error(
                        "Algo inesperado ha ocurrido, por favor, vuelva a intentarlo más tarde."
                      )
                }
                className="imagen-proyecto-interactiva"
              />
              {index == 0 ? (
                imagenSeleccionadaPorsche < porsche.length - 1 ? (
                  <button onClick={() => siguienteImagen(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="300px"
                      viewBox="0 -960 960 960"
                      width="50px"
                       fill="#000000"
                    >
                      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                    </svg>
                  </button>
                ) : (
                  <button>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="300px"
                  viewBox="0 -960 960 960"
                  width="50px"
                   fill="#000000"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
                  </button>
                )
              ) : index == 1 ? (
                imagenSeleccionadaDoggy < doggyStickers.length - 1 ? (
                  <button onClick={() => siguienteImagen(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="300px"
                      viewBox="0 -960 960 960"
                      width="50px"
                       fill="#000000"
                    >
                      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                    </svg>
                  </button>
                ) : (
                  <button>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="300px"
                  viewBox="0 -960 960 960"
                  width="50px"
                   fill="#000000"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
                  </button>
                )
              ) : index == 2 ? (
                imagenSeleccionadaFreelance < freelanceHub.length - 1 ? (
                  <button onClick={() => siguienteImagen(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="300px"
                      viewBox="0 -960 960 960"
                      width="50px"
                       fill="#000000"
                    >
                      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                    </svg>
                  </button>
                ) : (
                  <button>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="300px"
                  viewBox="0 -960 960 960"
                  width="50px"
                   fill="#000000"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
                  </button>
                )
              ) : (
                console.error(
                  "Algo inesperado ha ocurrido, por favor, vuelva a intentarlo más tarde."
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProyectosRealizados;
// <textarea
// readOnly
// value={
//   index == 0
//     ? contenidosIndice[2].descripcion1
//     : index == 1
//     ? contenidosIndice[2].descripcion2
//     : index == 2
//     ? contenidosIndice[2].descripcion3
//     : console.error(
//         "Algo inesperado ha ocurrido, por favor, vuelva a intentarlo más tarde."
//       )
// }
// className="proyectos-realizados-Descripcion"
// ></textarea>
