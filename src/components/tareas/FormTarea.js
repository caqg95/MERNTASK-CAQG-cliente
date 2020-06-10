import React,{useContext,useState,useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
const FormTarea = () => {


      //Extraer proyectos de state inicial
  const proyectosContext=useContext(proyectoContext);
  const {proyecto}=proyectosContext;


  const tareasContext=useContext(tareaContext);
  const {tareaseleccionado,errortarea,agregarTarea,validarTarea,obtenerTareas,actualizarTarea}=tareasContext;


  //Effect que detecta si hay una tarea seleccionada
  useEffect(()=>{
      if(tareaseleccionado!==null){
        guardarTarea(tareaseleccionado)
      }else{
          guardarTarea({
              nombre:''
          })
      }
  },[tareaseleccionado]);


    //State del formulario
     const [tarea,guardarTarea]=useState({
        nombre:'',

     });
     const {nombre}=tarea;
    //Si no hay proyecto seleccionado

    if(!proyecto) return null;
    //Array destructuring para extaer el proyecto actual
    const[proyectoActual]=proyecto;


    const handleChange=e=>{
        guardarTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit=e=>{
        e.preventDefault();

        //Validar
        if(nombre.trim()===''){
            validarTarea();
            return;
        }

        //If guargar o editar
        if(tareaseleccionado===null)
        {
            //Agregar la nueva tarea al state de tareas
           
            tarea.proyecto=proyectoActual._id;
            //tarea.estado=false;
            agregarTarea(tarea)
        }
        else{
            //Editar Tarea
            actualizarTarea(tarea);
        }


        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);
        //Reinicar el form
        guardarTarea({
            nombre:''
        })
        
    }
    return ( 
        <div className="formulario">
            <form
            onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre Tarea..."
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                    type="submit"
                    className="btn btn-primario btn-submit btn-block"
                    value={tareaseleccionado?'Editar Tarea':'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea?<p className="mensaje error">El nombre de la tarea es obligatorio</p>:null}
        </div>
     );
}
 
export default FormTarea;