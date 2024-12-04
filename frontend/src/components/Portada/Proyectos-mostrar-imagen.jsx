import React from 'react';

function MostrarImagen({ imagen, projectIndex, imageIndex, onClose, onPrevious, onNext, isFirst, isLast }) {
      const getDescripcion = () => {
        const porscheDescriptions = [
            "En la imagen se puede ver la portada de nuestra réplica de Porsche. Como se ve en la imagen, contiene un navbar con un botón para acceder al menú, o para recargar la página. También podemos ver uno de los enlaces a la página oficial de Porsche (en este caso Macan 4) y, por último, aunque no se aprecie mucho ya que en este caso es una imagen, el background de Macan 4 es un video que se puede poner en pausa o en play, como el usuario guste. ",
            "Aquí podemos ver distintos enlaces a la página oficial de Porsche para acceder a los coches que se muestran en pantalla.",
            "En esta imagen se muestra un buscador en el que se puede elegir la ciudad en la que te encuentras, para que así la página te muestre las ofertas de tu zona.",
            "En la imagen, podemos apreciar más enlaces a la página oficial de Porsche y un footer básico con algo de información sobre la misma."
          ];
        
          const doggyStickersDescriptions = [
            "Aquí encontramos la portada del segundo proyecto. Como se aprecia en la imagen, tenemos un navbar fijo en el que podemos acceder a dos enlaces: uno es la página que se muestra en la imagen, con todos los stickers que se pueden comprar, y el otro enlace redirige al carrito de compras, que veremos más adelante.",
            "Esta es la sección que también se muestra en la primera imagen. Aquí tenemos todos los stickers a la venta con su respectivo precio.",
            "Más stickers a la venta.",
            "Lo que se aprecia en la imagen es la sección en la que añades un producto o varios al carrito de compras. Por un lado, tenemos distintas imágenes del sticker en cuestión, con un scroll hacia la derecha. También tenemos un botón para volver a la sección anterior. Debajo del botón, vemos toda la información del producto (título, precio y la frase personalizada única por sticker) y, por último, encontramos la posibilidad de añadir el producto al carrito, disponiendo de la opción de elegir tanto el tamaño como la cantidad a comprar. Poniéndonos un poco más técnicos, lo que ocurre al darle al botón de añadir al carrito es que se sube a localStorage toda la información del producto elegido, y más adelante en el carrito, se recoge esa información para finalizar la compra.",
            "En la imagen, podemos apreciar el carrito de compras, el cual cuenta con un input para cambiar la cantidad seleccionada y un botón para eliminar un producto. También calcula el precio total de todos los productos seleccionados y lo muestra en el subtotal. Por último, encontramos un botón para finalizar la compra y otro para volver a todos los productos, por si acaso se quisiera añadir alguno más. Nótese que al añadir un producto al carrito, se mostrará en el navbar la cantidad de productos que haya seleccionados."
          ];
        
          const freelanceHubDescriptions = [
            "Esta es la portada de FreelanceHub. Como se puede observar en la imagen, cuenta con un navbar con varios enlaces. El primero es para ir a la propia portada (o recargar la página si ya estás en ella). Después tenemos Solicitar servicios y Buscar proyectos (los cuales son meramente informativos en caso de no estar registrado), y por último, cuenta con los dos botones para iniciar sesión o crear tu cuenta. También podemos apreciar una frase de enganche y un buscador con las categorías que ofrece FreelanceHub.",
            "Aquí podemos apreciar seis de las muchas categorías que ofrece FreelanceHub y, debajo, el footer, con una descripción de lo que es FreelanceHub y más información de la página.",
            "En esta imagen se muestra el contenido de los enlaces Solicitar servicios y Buscar proyectos sin estar registrado. Como se puede apreciar en la imagen, tenemos más frases de enganche con un diseño atractivo y un botón con un enlace para iniciar sesión, lo que permite al usuario visualizar todos los contenidos y funcionalidades de la página.",
            "Este es el login de la página. A la izquierda contiene más información sobre FreelanceHub y más frases de enganche (al ser una página dedicada a freelancers y empresas, mi equipo y yo consideramos oportuno ofrecer un diseño lo más serio y atractivo posible, con muchas frases para atraer al usuario a utilizar FreelanceHub). A la derecha tenemos los campos necesarios para iniciar sesión (correo y contraseña). Cabe destacar que aquí ya estamos implementando backend para guardar toda esta información en caso de tratarse de un registro, o para consultar la base de datos si la información es correcta en caso de querer iniciar sesión. En caso de darle a registrarse, también te pedirá nombre, apellidos y fecha de nacimiento. Por último, también ofrecemos la posibilidad de iniciar sesión con Google; esto fue implementado utilizando Auth0.",
            "Aquí tenemos la información personal del usuario logueado. Esta es la primera sección que veremos tras iniciar sesión. El navbar ha sido actualizado, mostrando ahora un botón para notificaciones, otro para los chats abiertos, otro para la sección del perfil (la que estamos actualmente) y un último botón para cerrar la sesión. En la parte izquierda, encontramos un sidebar con los diferentes ítems que ofrece la sección de perfil, incluyendo también los enlaces a Solicitar servicios y Buscar proyectos actualizados. A la derecha tenemos la sección de información personal, donde podemos poner una imagen a nuestro perfil y cambiar la información de nuestra cuenta (el nombre y el correo no se podrán cambiar, ya que es una información que en condiciones normales no debería cambiar). Al hacer clic en Actualizar datos del perfil, se guardará toda esta información en la base de datos. Por supuesto, la contraseña será hasheada, en este caso utilizando bcrypt. ",
            "En esta sección, el usuario puede añadir a su perfil un enlace a su portfolio y también puede seleccionar entre un montón de habilidades y añadirlas al perfil. Por supuesto, al igual que todas las demás secciones, esto se guarda en la base de datos al darle al botón de guardar cambios.",
            "En la imagen vemos la sección proyectos en curso, en la cual el usuario puede añadir, mediante un formulario, los proyectos en los que se encuentra trabajando actualmente. Incluye un nombre para el proyecto, un pago si lo hubiera y una fecha límite para la que debería estar terminado el proyecto. Una vez rellenado el formulario, se agrega el proyecto a la lista que vemos en la imagen.",
            "Esta es la sección de proyectos finalizados. La funcionalidad y el diseño son exactamente iguales a la sección anterior, proyectos en curso, con la diferencia de que aquí tendremos que poner la fecha de inicio del proyecto manualmente. En proyectos en curso, esta fecha se tomaba sola al completar el formulario.",
            "Esta es la sección de información bancaria. Aquí lo primero que encontramos es un botón para añadir cuenta. Al hacer clic en ese botón se abrirá un formulario en el que el usuario deberá rellenar los campos de su nueva cuenta bancaria. Al finalizar el formulario, este se ocultará, y los datos introducidos se mostrarán en la lista como podemos ver en pantalla. Por último, añadir que cada cuenta en la lista tiene un botón para eliminar dicha cuenta de forma permanente, y si hacemos clic en la misma, se marcará como seleccionada actualmente.",
            "La siguiente sección es la de solicitar servicios, en esta ocasión actualizada ya para poder utilizarse. Aquí la parte contratante puede publicar una oferta de trabajo, con la posibilidad de añadir a la misma una imagen, un título, una cantidad de pago por hora y, por último, una descripción sobre el puesto o trabajo a ofertar. También se deberá añadir la categoría a la que pertenece la oferta. Después de rellenar toda esta información, al hacer clic en publicar anuncio, se enviará un mensaje de confirmación al ofertante y se añadirá la oferta a la sección buscar proyectos, a su respectiva categoría.",
            "Para finalizar, la imagen que tenemos en pantalla es la sección buscar proyectos, en la cual se visualizarán todas las ofertas que hayan sido publicadas, con la posibilidad de filtrar por categoría. Cada oferta mostrará la imagen, título, pago y categoría que tenga por defecto, y dispondrá de dos botones adicionales. Uno es para ver la descripción del proyecto (mostrando un overlay muy similar al que estoy usando en este portfolio en la sección de proyectos para ver la descripción del proyecto) y el otro botón es para ofrecer tu candidatura a dicha oferta. La imagen que tiene el proyecto prueba de servicio que podemos ver como ejemplo de oferta, es la sección que vimos en la segunda imagen de este proyecto. Si estás logueado, al hacer clic en una de esas categorías, serás redirigido a esta sección filtrando con la categoría seleccionada."
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
