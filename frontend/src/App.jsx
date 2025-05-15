import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import PortadaApp from "./components/Portada/Portada-app";
import ProApp from "./components/Proyectos/ProApp";

export function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const ejecutarCada13Minutos = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        try {
          const response = await fetch('http://localhost:5000/api/users/refreshCoockieCheck', {
            method: 'GET',
            credentials: 'include'
          });
          if (!response.ok) { 
            throw new Error('Usuario desconocido.');
          }
          const data = await response.json();
          if (!data.hasRefreshToken) {
            console.log('No hay token de refresco');
            setIsLogged(false);
            return;
          }
        } catch (err) {
          console.error('Error al verificar el token de refresco:', err.message);
          setIsLogged(false);
          return;
        }
      }
      try {
        console.log('Actualizando el token...');
        const response = await fetch('http://localhost:5000/api/users/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
  
        if (!response.ok) {
          throw new Error('Error al actualizar el token');
          setIsLogged(false);
        }
        const data = await response.json();
        const email = data.email;
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("email", email)
        console.log('El token ha sido actualizado');
        setIsLogged(true);
      } catch (err) {
        console.error('Error al actualizar el token:', err.message);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("email");
        setIsLogged(false);
      }
    };
  
    const intervalo = setInterval(ejecutarCada13Minutos, 13 * 60 * 1000);
    ejecutarCada13Minutos(); // Ejecutar inmediatamente al montar el componente
  
    return () => clearInterval(intervalo);
  }, []);
  return (
    <div className="app">
      {isLogged ? (
        <ProApp />
      ) : (
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PortadaApp />} />
          </Routes>
        </div>
      )}
    </div>
  );
}