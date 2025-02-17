import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';
const Login = (props) => {

  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { mensaje, autenticado, iniciarSesion } = useContext(AuthContext);


  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos');
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
          // eslint-disable-next-line
  }, [mensaje, autenticado, props.history])
  //State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });
  //Extraer de usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  //Cuando el usuario quiere Iniciar Sesión
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campo vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta('Todo los campos son requeridos', 'alerta-error');
      return;
    }
    //Pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
