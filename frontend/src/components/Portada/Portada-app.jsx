import React from 'react'
import "../css/SidebarPortada.css";
import SidebarPortada from "./Sidebar-portada";
import imagenPortada from '../../assets/idea-imagen-portada2.png';
import Indice from './Indice';
import Bienvenida from './Bienvenida';
import SobreMí from './SobreMí';
import Trayectoria from './Trayectoria';
import ProyectosRealizados from './ProyectosRealizados';
import Retos from './Retos';
import Aptitudes from './Aptitudes';
import ProyectoEnlace from './ProyectoEnlace';


function PortadaApp() {
    return (
      <div className="app-portada">
      <SidebarPortada />
        <div className="portada-content">
        </div>
        <div className='indice-y-bienvenida'>
      <Bienvenida />
      <Indice />
      </div>
      <SobreMí />
      <Trayectoria />
      <ProyectosRealizados />
      <Aptitudes />
      <Retos />
      <ProyectoEnlace />
      </div>
    );
  }

export default PortadaApp