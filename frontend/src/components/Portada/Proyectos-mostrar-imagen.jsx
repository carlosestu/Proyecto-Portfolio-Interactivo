import React from 'react';

function MostrarImagen({ imagen, projectIndex, imageIndex, onClose, onPrevious, onNext, isFirst, isLast }) {
      const getDescripcion = () => {
        const porscheDescriptions = [
            "Descripción de PORSCHE1",
            "Descripción de PORSCHE2",
            "Descripción de PORSCHE3",
            "Descripción de PORSCHE4"
          ];
        
          const doggyStickersDescriptions = [
            "Descripción de DOGGYSTICKERS1",
            "Descripción de DOGGYSTICKERS2",
            "Descripción de DOGGYSTICKERS3",
            "Descripción de DOGGYSTICKERS4",
            "Descripción de DOGGYSTICKERS5"
          ];
        
          const freelanceHubDescriptions = [
            "Descripción de FREELANCEHUB1",
            "Descripción de FREELANCEHUB2",
            "Descripción de FREELANCEHUB3",
            "Descripción de FREELANCEHUB4",
            "Descripción de FREELANCEHUB5",
            "Descripción de FREELANCEHUB6",
            "Descripción de FREELANCEHUB7",
            "Descripción de FREELANCEHUB8",
            "Descripción de FREELANCEHUB9",
            "Descripción de FREELANCEHUB10",
            "Descripción de FREELANCEHUB11"
          ];
        switch(projectIndex) {
          case 0:
            return porscheDescriptions[imageIndex];
          case 1:
            return doggyStickersDescriptions[imageIndex];
          case 2:
            return freelanceHubDescriptions[imageIndex];
          default:
            return "Descripción no disponible";
        }
      };
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-image-container">
            <button 
              className="modal-nav-button modal-prev-button" 
              onClick={onPrevious}
              disabled={isFirst}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#000000"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </button>
            <img src={imagen} alt="Imagen ampliada" className="modal-image" />
            <button 
              className="modal-nav-button modal-next-button" 
              onClick={onNext}
              disabled={isLast}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#000000"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </button>
            <button className="modal-close-button" onClick={onClose}>
              &#10005;
            </button>
          </div>
          <p className="modal-description">{getDescripcion()}</p>
        </div>
      </div>
    );
  }
  
  export default MostrarImagen;
