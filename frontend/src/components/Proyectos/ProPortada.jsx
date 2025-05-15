import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Proyectos-css/proIndex.css";

function ProPortada() {
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getImage = async () => {
      try {
        const email = sessionStorage.getItem("email");
        if (!email) {
          throw new Error('Email no encontrado en sessionStorage');
        }

        const idResponse = await fetch('http://localhost:5000/api/users/id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        
        if (!idResponse.ok) {
          throw new Error('Error al obtener el id de usuario');
        }
        
        const { userId } = await idResponse.json();
        const imageResponse = await fetch(`http://localhost:5000/api/users/${userId}/image`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!imageResponse.ok) {
          throw new Error('Error al obtener la imagen');
        }

        const blob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImagen(imageUrl);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    getImage();
  }, []);

  return (
    <div 
      className='proyectos-portada' 
      style={{
        backgroundImage: imagen ? `url(${imagen})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'
      }}
    >
    <button onClick={() => navigate("/configuracion")}>Configuración</button>
      {!imagen && <p>Cargando imagen...</p>}
    </div>
  );
}

export default ProPortada;