import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'

import Sidebar from './dashboard/sidebar'
import Navbar from './dashboard/navbar'
import Login from './login/login'
import Cargando from './cargador/cargando'
import Bienvenido from './nuevousuario/bienvenido'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            precargado:false
        }
    }
    toggle=()=>{
        if (window.screen.width >= 1024){
            document.getElementById('wrapper').classList.toggle('toggled')
        }
        else{
            alert('Mobil')
        }
    }
    componentDidMount(){
        setTimeout(()=>this.setState({precargado:true}), 3000);
        
    }
    render() {
        if (this.state.precargado!==false&&this.props.usuario!==[]) {
           
            if (firebase.auth().currentUser) {
                if (this.props.usuario.registrado===false) {
                 return(<Bienvenido/>)
                }else{
                    
                    return(
                        <div className="d-flex" id="wrapper">
                            <Sidebar/>
                            <div id="page-content-wrapper">
                                <Navbar toggle={this.toggle}/>
                                <div className="container-fluid">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    )
                }
            }else{
                return(
                <Login/>
                )
            }
        }else{
            return(
            <Cargando/>
            )
        }
       
        
    }
}

const mapStateProps = state =>({
    usuario: state.info,
    info:state.info,
})

const mapDispatchToprops = dispatch =>({
    UpdateUsuario(usuario){
      dispatch({
        type:'usuario',
        usuario
      })
    },
})

export default connect(mapStateProps,mapDispatchToprops)(Dashboard);