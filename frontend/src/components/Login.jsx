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
  const registerTitle = "Crear nueva cuenta";
  const textoEnlace1 = "¿Aún no tienes cuenta? pulsa aqui para ";
  const textoEnlace2 = "¿Ya tienes cuenta? Haz click aquí para ";
  const enlaceContent1 = "Registrarte!";
  const enlaceContent2 = "iniciar sesión";

  const initialMode = location.state?.mode || "register";
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

    if (aContent === "Registrarte!") {
      try {
        const loginDataToBackend = {
          email: emailLoginCorreo,
          password: passwordLoginCorreo
        };
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(loginDataToBackend)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error en el inicio de sesión');
        }

        const data = await response.json();
        sessionStorage.setItem("accessToken", data.accessToken);
        window.location.href = `/`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const userDataTobackEnd = {
          email: email,
          password: password,
          full_name: nombre,
          date_of_birth: birthDate
        };
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(userDataTobackEnd)
        });

        if (!response.ok) {
          throw new Error('Error en el registro');
        }

        const data = await response.json();
        sessionStorage.setItem("accessToken", data.accessToken);
        window.location.href = `/`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const cambiarLoginORegister = () => {
    if (aContent === "Registrarte!") {
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
      <div className="login">
        <h2>{h1Content}</h2>
        <div>
          {aContent === "iniciar sesión" ? (
            <div>
              <form className="formularioLogin" onSubmit={handleFormSubmit}>
                <p>
                  Nombre:{" "}
                  <input
                    type="text"
                    placeholder="Nombre"
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
                <p>
                {p1Content}
                <a href="#register" onClick={cambiarLoginORegister}>
                  {aContent}
                </a>
              </p>
              </form>
            </div>
          ) : (
            <div>
            <form className="formularioLogin" onSubmit={handleFormSubmit}>
            <h2 className="fraseBienvenida">Bienvenido de nuevo!</h2>
            <p>Introduzca sus credenciales para acceder a su cuenta.</p>
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
              <p>
              {p1Content}
              <a href="#register" onClick={cambiarLoginORegister}>
                {aContent}
              </a>
            </p>
            </form>
            </div>
          )}
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;