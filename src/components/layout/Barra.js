import React,{useContext,useEffect} from 'react';
import AuthContext from '../../context/autentificacion/authContext';
const Barra = () => {
    const {usuario,usuarioAutenticado,cerrarSesion} = useContext(AuthContext);
    //console.log(usuario['nombre']);
    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[])
    return ( 
        <header className="app-header">
            {
                usuario?
                        <p className="nombre-usuario">Hola.<span>{usuario.nombre}</span></p>                
                :null
            }
            <nav className="nav-principal">
                <button 
                        className="btn btn-blank cerrar-sesion"
                        onClick={()=>cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;