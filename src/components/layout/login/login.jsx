import React, { Component } from 'react'
import firebase from '../../../firebaseConfig'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

class login extends Component {
    constructor(props){
        super(props)

    }
    socialLogin = async (prev)=>{
        await firebase
        .auth()
        .signInWithPopup(prev)
        .then(result => {
           
        })
        .catch(error => {
            console.log(error.message)
        });
    }
    render() {
        let google = new firebase.auth.GoogleAuthProvider()
        let facebook = new firebase.auth.FacebookAuthProvider();
        if (!firebase.auth().currentUser) {
            return (
                <React.Fragment>
                    <div className="shape-container">
                        <div className="row">
                            <div className="col-12 col-xl-5 bg-white vh-100">
                                <div className="container mt-4">
                                    <div className="header mt-5">
                                        <h1 className="title-dashboard">KaizenApp</h1>
                                    </div>
                                    <div className="body">
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <button onClick={()=>this.socialLogin(google)} className="btn btn-general btn-block col-12 col-md-8 col-xl-10"><i className="fab fa-google"></i> Iniciar con Google</button>
                                                <button onClick={()=>this.socialLogin(facebook)}className="btn btn-general btn-block col-12 col-md-8 col-xl-10"><i className="fab fa-facebook-f"></i> Iniciar con Facebook</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <h1 className="title-dashboard">Atencion</h1>
                                        <small className="text-secondary">Al registrarse con nosotros acepta nuestros términos y condiciones, KaizenApp requiere información adicional y personal.</small>
                                    </div>
    
                                </div>
                            </div>
                            <div className="col-12 col-xl-7 bg-login vh-1000">
                                <div className="container h1-title">
                                    <h1 className="text-white">Bienvenido a <b>Kaizen</b></h1>
                                    <span className="text-white">Inicia sesion para continuar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        else{
            return(
                <Redirect to="/"/>
            )
        }

    }
}
const mapStateProps = state =>({
    usuario: state.usuario
})


export default connect(mapStateProps,null)(login);