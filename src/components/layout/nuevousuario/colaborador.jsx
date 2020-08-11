import React, { Component } from 'react'
import firebase from 'firebase';
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

class colaborador extends Component {
    constructor(props){
        super(props)
        this.state={
            referencia:'',
            usuarioRef:'',
            usuarioKey:''
        }
    }
    toggledView=(view)=>{
        this.props.toggledView(view)
    }
    registrar(){
        firebase.database().ref('usuarios').orderByChild('referencia').equalTo(this.state.referencia).once("value")
        .then((snapshot)=> {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot)=> {
                   this.setState({usuarioKey:childSnapshot.key})
                });
                let usuarioRef = Object.values(snapshot.val())
                this.setState({usuarioRef:usuarioRef[0]})

                if (firebase.database().ref('usuarios/'+this.state.usuarioKey).set(null)) {
                    const paramsUsuario={
                        displayname:this.props.usuario.displayName,
                        photoURL:this.props.usuario.photoURL,
                        empresa:this.state.usuarioRef.empresa,
                        estatus:'true',
                        referencia:this.state.usuarioRef.referencia,
                        puesto:this.state.usuarioRef.puesto,
                        permisos:this.state.usuarioRef.permisos
                }
                if (firebase.database().ref('usuarios').child(firebase.auth().currentUser.uid).set(paramsUsuario)) {
                    window.location.reload(); 
                }
                }
                
            }
            else{
                this.notifyTopCenter()
            }
        })
    }
    notifyTopCenter = () =>
    toast.warning("Tu referencia no existe", {
        position: toast.POSITION.TOP_CENTER
    })
    render() {
        return (
            <div className='wrapper-bienvenida'>
                <ToastContainer />
            <div className="container container-bienvenida">
                <h1>Comienza</h1>
                <span>Por favor ingresa la referencia que te otorgo tu empresa</span>
                <div className="row justify-content-center mt-2">
                    <div className="col-12 col-xl-4 col-md-6">
                        <input type="text" name="nombre" className="form-control rounded-1" placeholder="Nombre de tu empresa"
                        onChange={(e)=>{this.setState({referencia: e.target.value} );}}
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
export default connect(mapStateProps,null)(colaborador)