import React from 'react';
import contenidosIndice from "../../InfoGeneral/ContenidosPortfolio";



function Indice() {
  const enlace1 = '#SobreMi';
  const enlace2 = '#trayectoria';
  const enlace3 = '#proyectos-realizados';
  const enlace4 = '#aptitudes-tecnologias';
  const enlace5 = '#retos-soluciones';
  const enlace6 = '#proyecto-de-referencia';
  return (
    <div className='indice'>
    <h2>Indice:</h2>
    <ul>
        {contenidosIndice.map((contenido) => (
          contenido.id === 1 ? (
            <li key={contenido.id}><a className='enlaces-indice' href={enlace1}>{contenido.titulo}</a></li>
          ) : contenido.id === 2 ? (
            <li key={contenido.id}><a className='enlaces-indice' href={enlace2}>{contenido.titulo}</a></li>
          ) : contenido.id === 3 ? (
            <li key={contenido.id}><a className='enlaces-indice' href={enlace3}>{contenido.titulo}</a></li>
          ): contenido.id === 4 ? (
            <li key={contenido.id}><a className='enlaces-indice' href={enlace4}>{contenido.titulo}</a></li>
          ): contenido.id === 5 ? (
            <li key={contenido.id}><a className='enlaces-indice' href={enlace5}>{contenido.titulo}</a></li>
          ): contenido.id === 6 ? (
            <li key={contenido.id}><a className='enlaces-indice' href={enlace6}>{contenido.titulo}</a></li>
          ) : null
        ))}
      </ul>
    </div>
  )
}

export default Indice