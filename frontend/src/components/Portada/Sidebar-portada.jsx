import React from 'react'
import "../css/SidebarPortada.css";
import imagenPortfolio from '../../assets/imagen-portfolio.jpg';


function SidebarPortada() {
    return (
      <div className="sidebarPortada">
            <div className='imagen-div'>
              <img className="imagen-sidebarPortada" src={imagenPortfolio} />
          </div>
          <div>
         <h2>Carlos Estupiñá Rodenas</h2>
         <h3>Full Stack Web Developer Junior</h3>
         </div>
    </div>
    );
  }

export default SidebarPortada