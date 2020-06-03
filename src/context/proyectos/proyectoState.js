import React, { useReducer } from "react";
import uuid from 'uuid/v4';
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
      } from '../../types'



const ProyectoState = (props) => {
  const proyectos=[
    {id:1,nombre:'Tienda Virtual'},
    {id:2,nombre:'Intranet'},
    {id:3,nombre:'Diseño de Sitio web'},
  ]

  const initialState = {
    proyectos:[],
    formulario: false,
    errorformulario:false,
    proyecto:null
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);
  //serie de funciones para ejecutar las acciones
  const mostrarFormulario=()=>{
    dispatch({
      type:FORMULARIO_PROYECTO
    })
  }
//Obtener los proyectos
const obtenerProyectos=()=>{
  dispatch({
        type:OBTENER_PROYECTOS,
        payload:proyectos
  })
}
//Agregar un nuevo proyecto
const agregarProyecto=proyecto=>{
  proyecto.id=uuid();
  //Insertar el proyecto en el state
  dispatch({
    type:AGREGAR_PROYECTO,
    payload:proyecto
  })
}
//Validar errores del formulario
const mostrarError=()=>{
  dispatch({
    type:VALIDAR_FORMULARIO,
  })
}
//Seleccione el Proyecto que el usuario dio click
const proyectoActual=proyectoId=>{
  dispatch({
    type:PROYECTO_ACTUAL,
    payload:proyectoId
  })
}
const eliminarProyecto=proyectoId=>{
  dispatch({
    type:ELIMINAR_PROYECTO,
    payload:proyectoId
  })
}
  return (
    <proyectoContext.Provider
      value={{
        proyectos:state.proyectos,
        formulario: state.formulario,
        errorformulario:state.errorformulario,
        proyecto:state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
