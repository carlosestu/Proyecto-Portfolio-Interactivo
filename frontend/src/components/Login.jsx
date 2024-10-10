import { React, useState, useEffect } from "react";
import "./css/Login.css";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [loginCorreo, setLoginCorreo] = useState(false);
  const [emailLoginCorreo, setEmailLoginCorreo] = useState("");
  const [passwordLoginCorreo, setPasswordLoginCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const loginTitle = "Iniciar sesión con tu cuenta";
  const registerTitle = "Crear una nueva cuenta";
  const textoEnlace1 = "¿No tienes cuenta? ";
  const textoEnlace2 = "¿Ya tienes una cuenta? Haz click aquí para ";
  const enlaceContent1 = "Registrate!";
  const enlaceContent2 = "iniciar sesión";

  const initialMode = location.state?.mode || "login";
  const [h1Content, setH1Content] = useState(
    initialMode === "register" ? registerTitle : loginTitle
  );
  const [p1Content, setP1Content] = useState(
    initialMode === "register" ? textoEnlace2 : textoEnlace1
  );
  const [aContent, setAcontent] = useState(
    initialMode === "register" ? enlaceContent2 : enlaceContent1
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (aContent === "Registrate!") {
      try {
        const loginDataToBackend = {
          email: emailLoginCorreo,
          password_hash: passwordLoginCorreo
        };
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginDataToBackend)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error en el inicio de sesión');
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);

        const userLoginInfo = JSON.stringify({
          email: emailLoginCorreo,
          password: passwordLoginCorreo,
          birthDate: new Date(data.date_of_birth).toISOString().split('T')[0],
          fullName: data.full_name || "Nombre completo",
          userImage: data.user_image || anonimo,
        });
        localStorage.setItem("userInfo", userLoginInfo);
        window.location.href = `/`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const userDataTobackEnd = {
          email,
          password_hash: password,
          full_name: nombre,
          date_of_birth: birthDate
        };
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDataTobackEnd)
        });

        if (!response.ok) {
          throw new Error('Error en el registro');
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);

        const userInfoToStringify = {
          email,
          password,
          birthDate,
          fullName: nombre,
          userImage: anonimo,
        };
        const userInfo = JSON.stringify(userInfoToStringify);
        localStorage.setItem("userInfo", userInfo);
        window.location.href = `/`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const cambiarLoginORegister = () => {
    if (aContent === "Registrate!") {
      setH1Content(registerTitle);
      setP1Content(textoEnlace2);
      setAcontent(enlaceContent2);
    } else {
      setH1Content(loginTitle);
      setP1Content(textoEnlace1);
      setAcontent(enlaceContent1);
    }
  };

  useEffect(() => {
    if (location.state?.mode) {
      if (location.state.mode === "register") {
        setH1Content(registerTitle);
        setP1Content(textoEnlace2);
        setAcontent(enlaceContent2);
      } else {
        setH1Content(loginTitle);
        setP1Content(textoEnlace1);
        setAcontent(enlaceContent1);
      }
    }
  }, [location]);

  return (
    <div className="divLoginGeneral">
      <div className="loginIzquierda">
        <div className="textoWrapper">
          <div className="textoArriba">
            <h1>¡Únete a FreelanceHub y encuentra centenares de ofertas!</h1>
          </div>
          <div className="textoIzquierda">
            <ul>
              <li>Amplia variedad de oportunidades en diferentes sectores</li>
              <li>Totalmente gratuito</li>
              <li>Perfiles verificados con gran experiencia</li>
              <div className="textoFinal"><strong>No lo pienses más!</strong></div>
            </ul>
          </div>
        </div>
      </div>
      <div className="loginDerecha">
        <h2>{h1Content}</h2>
        <p>
          {p1Content}
          <a href="#register" onClick={cambiarLoginORegister}>
            {aContent}
          </a>
        </p>
        <div>
          {aContent === "iniciar sesión" ? (
            <div>
              <form className="formularioLogin" onSubmit={handleFormSubmit}>
                <p>
                  Nombre completo:{" "}
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    required
                    value={nombre}
                    autoComplete="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </p>
                <p>
                  Email:{" "}
                  <input
                    type="email"
                    placeholder="Ejemplo@gmail.com"
                    required
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </p>
                <p>
                  Contraseña:{" "}
                  <input
                    type="password"
                    placeholder="*********"
                    required
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </p>
                <p>
                  Fecha de nacimiento:{" "}
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </p>
                <button type="submit" disabled={loading}>
                  Enviar datos
                </button>
              </form>
            </div>
          ) : (
            <div>
            <form className="formularioLogin" onSubmit={handleFormSubmit}>
              <p>
                Email:{" "}
                <input
                  type="email"
                  placeholder="Ejemplo@gmail.com"
                  required
                  value={emailLoginCorreo}
                  autoComplete="email"
                  onChange={(e) => setEmailLoginCorreo(e.target.value)}
                />
              </p>
              <p>
                Contraseña:{" "}
                <input
                  type="password"
                  placeholder="*********"
                  required
                  value={passwordLoginCorreo}
                  autoComplete="current-password"
                  onChange={(e) => setPasswordLoginCorreo(e.target.value)}
                />
              </p>
              <button type="submit" disabled={loading}>
                Enviar datos
              </button>
            </form>
            </div>
          )}
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="loginParaMovil">
      <div className="divMovil1">
        <h2>
          Unete a nosotros y encuentra trabajo cuanto antes!{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffff"
          >
            <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
          </svg>
        </h2>
        <ul>
          <li>Contacto con empresas de cualquier parte de España</li>
          <li>La inscripcion es totalmete gratuita, aprovecha ahora!</li>
          <li>
            Un monton de categorias entre las que puedes buscar u ofrecer
            trabajo
          </li>
        </ul>
      </div>
      <div className="divMovil2">
        <h2>{h1Content}</h2>
        <p>
          {p1Content}
          <a href="#register">{aContent}</a>
        </p>
        <div>
        </div>
        <div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;