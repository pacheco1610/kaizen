import React, { Component } from 'react'
import firebase from '../firebaseConfig'
import '../estilos/layout.css'
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

class AuthContext extends Component {
    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            menu:[],
            clientes:this.props.clientes,
            tareas:[]
        }
    }
    componentDidMount=()=>{
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({ isSignedIn: !!user })
            this.props.UpdateUsuario(user)

            let userId = firebase.auth().currentUser.uid;
            firebase.database().ref('usuarios/'+userId).once("value")
            .then((snapshot)=> {
                if (!snapshot.exists()) {
                    this.props.UpdateInfo({
                        displayName:user.displayName,
                        photoURL:user.photoURL,
                        registrado:false
                    })
                }
                else{
                    this.props.UpdateInfo(snapshot.val())
                    /*-------------------------------CLIENTES--------------------------------------- */
                    firebase.database().ref('clientes').orderByChild('idempresa').equalTo(snapshot.val().empresa).on('child_added',snap=>{
                        let clientes={
                            key:snap.key,
                            info:snap.val()
                        }
                        this.props.Clientes(clientes)
                    })
                    firebase.database().ref('clientes').orderByChild('idempresa').equalTo(snapshot.val().empresa).on('child_changed',snap=>{
                        let clientes=this.props.clientes.filter(item => item.key!=snap.key)
                        clientes.push({
                            key:snap.key,
                            info:snap.val()
                        })
                        this.props.UpdateClientes(clientes)
                    })

                    firebase.database().ref('clientes').orderByChild('idempresa').equalTo(snapshot.val().empresa).on('child_removed',snap=>{
                        let clientes=this.props.clientes.filter(item => item.key!=snap.key)
                        this.props.UpdateClientes(clientes)
                    })
                    /*-------------------------------COLABORADORES--------------------------------------- */
                    firebase.database().ref('usuarios').orderByChild('empresa').equalTo(snapshot.val().empresa).on('child_added',snap=>{
                        this.props.colaboradores(snap.val())
                    })
                    firebase.database().ref('usuarios').orderByChild('empresa').equalTo(snapshot.val().empresa).on('child_removed',snap=>{
                        let colaboradores=this.props.colaboradoresInfo.filter(item=> item.referencia!=snap.val().referencia)
                        this.props.UpdateColaboradores(colaboradores)
                    })
                    /*-------------------------------PUESTOS------------------------------------ */
                    firebase.database().ref('puestos').orderByChild('empresa').equalTo(snapshot.val().empresa).on('child_added',snap=>{
                        this.props.puestos(snap.val())
                    })
                     /*-------------------------------PUESTOS------------------------------------ */
                    firebase.database().ref('habilidades').on('child_added',snap=>{
                        this.props.habilidades(snap.val())
                    })
                     firebase.database().ref('permisos').on('child_added',snap=>{
                        this.props.permisos(snap.val())
                    })
                       /*-------------------------------Tareas------------------------------------ */
                            /*--------------------------Tarea Pendiente---------------------*/
                            firebase.database().ref('tareas').orderByChild('empresa').equalTo(snapshot.val().empresa).on('child_added',snap=>{
                                    snap.val().responsables.map(responsable =>
                                        {if(responsable.referencia===snapshot.val().referencia&&responsable.estatustarea==='pendiente'){
                                        this.props.Tareas({
                                            key:snap.key,
                                            asignador:snap.val().asignador,
                                            descripcion:snap.val().descripcion,
                                            empresa:snap.val().empresa,
                                            estatustarea:snap.val().estatustarea,
                                            estatus:snap.val().estatus,
                                            fecha:snap.val().fecha,
                                            fechaCreada:snap.val().fechaCreada,
                                            responsables:snap.val().responsables,
                                            titulo:snap.val().titulo
                                        })
                                        }}
                                    )
                            })
                            firebase.database().ref('tareas').orderByChild('empresa').equalTo(snapshot.val().empresa).on('child_changed',snap=>{
                                snap.val().responsables.map(responsable =>
                                    {if(responsable.referencia===snapshot.val().referencia&&responsable.estatustarea==='realizada'){
                                        let tareasFilter=this.props.TareasUpdate.filter(item => item.key!=snap.key)
                                        tareasFilter.push({
                                            key:snap.key,
                                            asignador:snap.val().asignador,
                                            descripcion:snap.val().descripcion,
                                            empresa:snap.val().empresa,
                                            estatustarea:snap.val().estatustarea,
                                            estatus:snap.val().estatus,
                                            fecha:snap.val().fecha,
                                            fechaCreada:snap.val().fechaCreada,
                                            responsables:snap.val().responsables,
                                            itulo:snap.val().titulo
                                        })
                                        this.props.UpdateTareas(tareasFilter)
                                    }
                                })
                             
                        })
                         /*--------------------------Tareas Asignadas---------------------*/
                         firebase.database().ref('tareas').orderByChild('empresa').equalTo(snapshot.val().empresa).on('child_added',snap=>{
                            let comprobar=0;
                            snap.val().responsables.map(responsable =>
                                {
                                    if(responsable.referencia===snapshot.val().referencia) {
                                        comprobar=comprobar+1;
                                    }
                                })
                            if (comprobar===0&&snap.val().asignador.referencia===snapshot.val().referencia) {
                                this.props.TareasAsignadas({
                                    key:snap.key,
                                    asignador:snap.val().asignador,
                                    descripcion:snap.val().descripcion,
                                    empresa:snap.val().empresa,
                                    estatustarea:snap.val().estatustarea,
                                    estatus:snap.val().estatus,
                                    fecha:snap.val().fecha,
                                    fechaCreada:snap.val().fechaCreada,
                                    responsables:snap.val().responsables,
                                    titulo:snap.val().titulo
                                })
                            }
                        })
                    /*-------------------------------MENU--------------------------------------- */
                    firebase.database().ref('usuarios/'+userId+'/permisos').on('child_added',snap=>{
                        const {menu}=this.state
                        menu.push({
                            icono:snap.val().icono,
                            titulo:snap.val().titulo,
                            key:snap.val().key
                        })
                        this.props.UpdateMenu(menu)
                    })
                }
            });
        })
    }
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}
const mapStateProps = state =>({
    usuario: state.usuario,
    clientes: state.clientes,
    colaboradoresInfo:state.colaboradores,
    TareasUpdate:state.Tareas
})

const mapDispatchToprops = dispatch =>({
    UpdateUsuario(usuario){
      dispatch({
        type:'usuario',
        usuario
      })
    },
    UpdateInfo(info){
        dispatch({
          type:'info',
          info
        })
      },
    Clientes(clientes){
        dispatch({
          type:'clientes',
          clientes
        })
      },
    UpdateClientes(clientes){
        dispatch({
          type:'updateClientes',
          clientes
        })
      },
    UpdateColaboradores(colaborador){
        dispatch({
          type:'UpdateColaboradores',
          colaborador
        })
      },
    UpdateMenu(menu){
        dispatch({
          type:'MENU',
          menu
        })
      },
      colaboradores(colaborador){
        dispatch({
          type:'COLABORADORES',
          colaborador
        })
      },
      permisos(permisos){
          dispatch({
              type:'permisos',
              permisos
          })
      },
      puestos(puestos){
        dispatch({
            type:'puestos',
            puestos
        })
    },
    habilidades(habilidades){
        dispatch({
            type:'habilidades',
            habilidades
        })
    },
    Tareas(tarea){
        dispatch({
            type:'Tareas',
            tarea
        })
    },
    TareasAsignadas(tareaasignada){
        dispatch({
            type:'TareasAsignadas',
            tareaasignada
        })
    },
    UpdateTareas(UpdateTareas){
        dispatch({
            type:'UpdateTareas',
            UpdateTareas
        })
    }
})

export default connect(mapStateProps,mapDispatchToprops)(AuthContext);