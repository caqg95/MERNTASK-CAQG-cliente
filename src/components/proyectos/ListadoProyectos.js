import React,{useContext,useEffect} from 'react';
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
const ListadoProyectos = () => {
    //Extraer proyectos de state inicial
  const proyectosContext=useContext(proyectoContext);
  const {proyectos,mensaje,obtenerProyectos}=proyectosContext;
 const {alerta,mostrarAlerta}=useContext(AlertaContext);

  //Obtener proyectos cuando carga el componente
  useEffect(()=>{
      //Si hay un error
      if(mensaje){
          mostrarAlerta(mensaje.msg,mensaje.categoria);
      }
    obtenerProyectos();
    //eslint-disable-next-line
   },[mensaje]);

  //revisar si proyecto tiene contenido
   if(proyectos.length===0)return <p>No hay proyectos,comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            {alerta?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>):null}
            <TransitionGroup>
            {proyectos.map(proyecto=>(
                <CSSTransition
                key={proyecto._id}
                timeout={200}
                classNames="proyecto"
                >
                    <Proyecto
              
                proyecto={proyecto}
                />
                </CSSTransition>
               
            ))}
            </TransitionGroup>           
        </ul>
     );
}
 
export default ListadoProyectos;