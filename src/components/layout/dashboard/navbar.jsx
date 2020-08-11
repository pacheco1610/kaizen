import React, { Component } from 'react'
import firebase from '../../../firebaseConfig'
import {connect} from 'react-redux'

import ModalMenu from '../../modals/modal-menu'

class navbar extends Component {
    toggle=()=>{
        this.props.toggle()
    }
    signOut(){
        firebase.auth().signOut()
        window.location.reload()
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light estilos-navbar">
                <div className="container">
                    <button className="btn" onClick={()=>this.toggle()}><i className="fas fa-bars"></i></button>
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="title-dashboard mr-2">{this.props.usuario.displayName}</span>
                                        <img src={this.props.usuario.photoURL} alt="..." className="img-perfil rounded-circle img-thumbnail" />
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button className="btn dropdown-item"> Mi Perfil</button>
                                        <button className="btn dropdown-item" onClick={()=>this.signOut()}> Cerrar Sesion</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>
                <ModalMenu isOpen={this.props.isOpen} isClose={this.props.isClose}/>
            </nav>
        )
    }
}
const mapStateProps = state =>({
    usuario: state.usuario
})


export default connect(mapStateProps,null)(navbar);