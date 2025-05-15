import React, { useState } from 'react';

function Configuracion() {
    const [imagenDeFondo, setImagenDeFondo] = useState(null);

    const subirNuevaImagen = (event) => {
        setImagenDeFondo(event.target.files[0]);
    };

    const cambiarFondo = async () => {
        const email = sessionStorage.getItem("email");
        if (!imagenDeFondo || !email) {
            alert('Por favor, selecciona una imagen y asegúrate de estar logueado.');
            return;
        }
    
        const formData = new FormData();
        formData.append('email', email);
        formData.append('image', imagenDeFondo, imagenDeFondo.name);
    
        try {
            const response = await fetch(`http://localhost:5000/api/users/image/change`, {
                method: 'PUT',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error al cambiar la imagen');
            }
    
            const result = await response.json();
            alert('Imagen cambiada con éxito');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cambiar la imagen');
        }
    };

    return (
        <div>
            <div className="imagenFondo"></div>
            <input
                type="file"
                onChange={subirNuevaImagen}
                accept="image/*"
                id="inputFile"
                style={{ display: 'none' }}
            />
            <label htmlFor="inputFile" className="subirImagen">
            Click aquí para cambiar fondo de pantalla
            </label>
            <button onClick={cambiarFondo}>Cambiar Fondo</button>
        </div>
    );
}

export default Configuracion;