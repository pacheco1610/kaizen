import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';

class empresa extends Component {
    constructor(props){
        super(props)
        this.state={
            empresa:'',
            rubro:''
        }
        this.ref= new firebase.database().ref()
    }
    toggledView=(view)=>{
        this.props.toggledView(view)
    }
    registrar(){
        const paramsempresa = {
            nombre:this.state.empresa,
            rubro:this.state.rubro,
            referencia:firebase.auth().currentUser.uid
        }
        if (paramsempresa.nombre!=''&&paramsempresa.rubro!='') {
            if (this.ref.child('empresas').push(paramsempresa)) {
                const paramsUsuario={
                        displayname:this.props.usuario.displayName,
                        photoURL:this.props.usuario.photoURL,
                        empresa:firebase.auth().currentUser.uid,
                        estatus:'true',
                        referencia:firebase.auth().currentUser.uid,
                        puesto:{
                            titulo:'Dueño'
                        },
                        permisos:{
                            0:{
                                titulo:'Tareas',
                                icono:'fas fa-calendar-check',
                                key:1
                            },
                            2:{
                                titulo:'Clientes',
                                icono:'fas fa-user-tag',
                                key:2
                            },
                            3:{
                                titulo:'Colaboradores',
                                icono:'fas fa-user-friends',
                                key:3
                            },
                            4:{
                                titulo:'Perfil de Puestos',
                                icono:'fas fa-clipboard-list',
                                key:4
                            }
                        }
                }
                if ( this.ref.child('usuarios').child(firebase.auth().currentUser.uid).set(paramsUsuario)) {
                    window.location.reload(); 
                }
            }
            else{
                alert('Contactate con tu desarrollador')
            }

        }
        else{
            this.notifyTopCenter()
        }

    }
    notifyTopCenter = () =>
    toast.warning("Llena todos los campos", {
        position: toast.POSITION.TOP_CENTER
    })
    render() {
        return (
            <div className='wrapper-bienvenida'>
                <ToastContainer />
                <div className="container container-bienvenida">
                    <h1>Registremos tu empresa</h1>
                    <span>Requerimos la siguiente información</span>
                    <div className="row justify-content-center mt-2">
                        <div className="col-12 col-xl-5 col-md-6">
                            <input type="text" name="nombre" className="form-control rounded-1" placeholder="Nombre de tu empresa"
                            value={this.state.nombre}
                            onChange={(e)=>{this.setState({empresa: e.target.value} );}}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2">
                        <div className="col-12 col-xl-5 col-md-6">
                            <input type="text" name="nombre" className="form-control rounded-1" placeholder="Rubro en el que se desarrolla"
                            value={this.state.nombre}
                            onChange={(e)=>{this.setState({rubro: e.target.value} );}}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2">
                        <button className="btn btn-general btn-block col-xl-4 col-md-6" onClick={()=>this.registrar()}>Registrarme</button>
                    </div>
                    <div className="d-flex mr-auto mt-2">
                        <button className="btn btn-general ml-auto" onClick={()=>this.toggledView(0)}>Volver</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateProps = state =>({
    usuario: state.info,
})
const mapDispatchToprops = dispatch =>({
    UpdateInfo(info){
        dispatch({
          type:'info',
          info
        })
      },
})
export default connect(mapStateProps,mapDispatchToprops)(empresa);