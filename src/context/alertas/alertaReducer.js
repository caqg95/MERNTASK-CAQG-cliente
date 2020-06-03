import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types'
//import Proyecto from '../../components/proyectos/Proyecto';
export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                alerta: null
            }
        default:
            return state;
    }
};
