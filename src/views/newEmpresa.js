import React, { useState, useContext, useEffect } from "react";
import Signup from "./Signup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {faGooglePlusG } from '@fortawesome/free-brands-svg-icons'
import { withRouter } from "react-router";
import {Link} from "react-router-dom"
import * as firebase from "firebase/app";
import app from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
import Errores from '../components/Errores'
import '../estilos/login.css'

const Login = ({ history }) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    const githubAuthProvider = new firebase.auth.GithubAuthProvider();

    const [signup, setsignup] = useState(false);
    const { usuario } = useContext(Auth);
    const [error, seterror] = useState('')

    useEffect(() => {
        if (usuario) {
            history.push("/");
        }
    }, [history, usuario]);

    const correoClave = async e => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(usuario.value, clave.value)
            .then(result => {
                console.log(result);
                history.push("/tareas");
            })
            .catch(error => {
                seterror(error.message)
            });
        
    };


    const socialLogin = async (provider)=>{
        await app
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            seterror(error.message)
        });
    }



    return (        
        <div class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h2 class="text-center mb-4">Bienvenido</h2>

                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 mx-auto">
                        <div class="card rounded-1">
                            <div class="card-body">
                                <form class="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                                    <div class="form-group">
                                        <label for="uname1">Email</label>
                                        <input type="text" class="form-control form-control-lg rounded-1" required="" />
                                    </div>
                                    <div class="form-group">
                                        <label>Contraseña</label>
                                        <input type="password" class="form-control form-control-lg rounded-1" autocomplete="new-password" />
                                    </div>
                                    <button type="submit" class="btn btn-block btn-login">Iniciar Sesión</button>
                                </form>
                                <div className="col-12">
                                    <hr/>
                                </div>
                                <button type="submit" 
                                class="btn btn-block 
                                btn-login"
                                onClick={() => socialLogin(googleAuthProvider)}>
                                    <FontAwesomeIcon icon={faGooglePlusG}/> Continua Con Google
                                    </button>
                            </div>

                        </div>

    
                    </div>
    
    
                </div>

    
            </div>
            </div>

    
            </div>
    );
    
};
export default withRouter(Login);
