import React, { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';
const NuevaCuenta = (props) => {

  const {alerta, mostrarAlerta} = useContext(AlertaContext);
  const {mensaje,autenticado,registrarUsuario} = useContext(AuthContext);

 //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado

  useEffect(()=>{
    if(autenticado){
      props.history.push('/proyectos');
    }
    if(mensaje){
      mostrarAlerta(mensaje.msg,mensaje.categoria);
    }
  },[mensaje,autenticado,mostrarAlerta,props.history])


  //State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  //Extraer de usuario
  const { nombre, email, password, confirmar } = usuario;

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
    if (nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim()===""
    ) {
      mostrarAlerta('Todos los campos son obligatorios','alerta-error');
      return;
    }
    //Password minimo de 6 caracteres
    if(password.length<6){
      mostrarAlerta('El password debe ser de al menos 6 caracteres','alerta-error');
      return;
    }
    //Los 2 password son iguales
    if(password!==confirmar){
      mostrarAlerta('Los password no son iguales','alerta-error');
      return;
    }
    //Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repetir Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrar"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
