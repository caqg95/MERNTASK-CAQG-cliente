import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando:true
    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Funciones
    const registrarUsuario = async datos => {
        try {
            const repuesta = await clienteAxios.post('/api/usuarios', datos);
            //console.log(repuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: repuesta.data
            });
            //Obtener el usuario
            usuarioAutenticado();
        }
        catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //Retonar el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //TODO: función para enviar el token por headers
            tokenAuth(token);
        }
        try {
            const repuesta = await clienteAxios.get('/api/auth');
            //console.log(repuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: repuesta.data.usuario
            })
        }
        catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //Cunado el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const repuesta= await clienteAxios.post('/api/auth',datos);
            //console.log(repuesta);
            dispatch({
                type:LOGIN_EXITOSO,
                payload:repuesta.data
            });
            usuarioAutenticado();
        }
        catch (error) {
           // console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }
    //Cierra la sesion del usuario
    const cerrarSesion=()=>{
        dispatch({
            type:CERRAR_SESION
        })
    }
    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando:state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
