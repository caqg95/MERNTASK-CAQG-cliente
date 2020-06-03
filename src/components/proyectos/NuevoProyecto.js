import React, { Fragment, useState,useContext } from "react";
import proyectoContext from '../../context/proyectos/proyectoContext';
const NuevoProyecto = () => {

  //Obtener el state del formulario
  const proyectosContext=useContext(proyectoContext);
  const {formulario,mostrarFormulario,agregarProyecto,errorformulario,mostrarError}=proyectosContext;
  //State para proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  //Extraer
  const { nombre } = proyecto;

  //Cunado el usuario envia el nuevo proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    //Validar el proyecto
    if(nombre===''){
      mostrarError();
      return;
    }
    //agregar al state
     agregarProyecto(proyecto);
    //Reinicar el form
    guardarProyecto({
      nombre:''
    })

   
  };
   //Mostrar el formulario
   const onClickFormulario=()=>{
    mostrarFormulario();
  }
  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario"
      onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>
        {
          formulario?
          (
            <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
            <input
              type="text"
              className="input-text"
              placeholder="Nombre Proyecto"
              name="nombre"
              value={nombre}
              onChange={onChangeProyecto}
            />
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Agregar Proyecto"
            />
          </form>
          )
          :
          null
        }
        {errorformulario?<p className="mensaje error">El nombre del Proyecto es obligatorio</p>:null}
    </Fragment>
  );
};

export default NuevoProyecto;
