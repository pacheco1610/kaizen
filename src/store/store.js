import {createStore} from 'redux'


const initialState = {
    menu:[],
    usuario:[],
    clientes:[],
    sidebarRight:'1',
    info:[],
    infocliente:[],
    colaboradores:[],
    permisos:[],
    puestos:[],
    infoColaborador:[],
    habilidades:[],
    InfoPuesto:[],
    Tareas:[],
    tareasAsignadas:[],
    tareadetalles:[],
    tareaevidencia:[],
    show:'show'
}

const reducerMenu=(state =  initialState,action)=>{
    switch (action.type) {
        case 'MENU':
                return ({...state,menu:state.menu.concat(action.menu)});
        case 'usuario':
            return ({...state,
                usuario:action.usuario});
        case 'permisos':
                return({...state,permisos:state.permisos.concat(action.permisos)})
        case 'puestos':
                return({...state,puestos:state.puestos.concat(action.puestos)})
        case 'InfoPuesto':
            return({...state,InfoPuesto:action.InfoPuesto})
        case 'habilidades':
            return({...state,habilidades:state.habilidades.concat(action.habilidades)})
        case 'info':
            return({...state,
                info:action.info});
        case 'infocliente':
            return({...state,
                infocliente:action.cliente});
        case 'clientes':
            return({...state,clientes:state.clientes.concat(action.clientes)})
        case 'updateClientes':
            return({...state,clientes:action.clientes})
        case 'SidebarRight':
            return({...state,sidebar:state.toggle.concat(action.toggle)})
        case 'COLABORADORES':
            return({...state,colaboradores:state.colaboradores.concat(action.colaborador)})
        case 'UpdateColaboradores':
            return({...state,colaboradores:action.colaborador})
        case 'InfoColaborador':
            return({...state,infoColaborador:action.infoColaborador});
        case 'Tareas':
            return({...state,Tareas:state.Tareas.concat(action.tarea)})
        case 'UpdateTareas':
            return({...state,Tareas:(action.UpdateTareas)})
        case 'TareasAsignadas':
            return({...state,tareasAsignadas:state.tareasAsignadas.concat(action.tareaasignada)})
        case 'TareasAsignadasUpdate':
            return({...state,tareasAsignadas:(action.tareaasignadaUpdate)})
        case 'Tarea':
            return({...state,tareadetalles:(action.tareadetalles)})
        case 'Evidencia':
            return({...state,tareaevidencia:(action.evidencia)})
        case 'Show':
            return({...state,show:action.show})
        default:
            return state;
    }
}
if (initialState.usuario!='') {
    alert(initialState.usuario.empresa)
}

export default createStore(reducerMenu)