import React,{useContext} from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';
const Tarea = ({tarea}) => {

    const proyectosContext=useContext(proyectoContext);
    const {proyecto}=proyectosContext;

    const tareasContext=useContext(tareaContext);
    const {obtenerTareas,eliminarTarea,actualizarTarea,guardarTareaActual}=tareasContext;


    //Extraer el proyecto
    const[proyectoActual]=proyecto;

    //Función que se ejecuta cuando el usuario presione el btn de eliminar tarea
    const tareEliminar=id=>{
        eliminarTarea(id,proyectoActual._id);
        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);
    }
    //
    const cambiarEstado=(tarea)=>{
        if(tarea.estado){
            tarea.estado=false;
        }
        else{
            tarea.estado=true;
        }
        actualizarTarea(tarea);
    }

    //
    const seleccionarTarea=(tarea)=>{
        guardarTareaActual(tarea);
    }

    return ( 
        <div className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                ?(
                    <button
                    type="button"
                    className="completo"
                    onClick={()=>cambiarEstado(tarea)}
                    >
                        Completo
                    </button>
                )
                :
                (
                    <button
                    type="button"
                    className="incompleto"
                    onClick={()=>cambiarEstado(tarea)}
                    >
                        Incompleto
                    </button>
                )
                }
            </div>
            <div className="acciones">
                <button
                type="button"
                className="btn btn-primario"
                onClick={()=>seleccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                 type="button"
                 className="btn btn-secundario"
                 onClick={()=>tareEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
     );
}
 
export default Tarea;