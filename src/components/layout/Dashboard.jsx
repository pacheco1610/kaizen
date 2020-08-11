import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom';

import Sidebar from './dashboard/sidebar'
import Container from './dashboard/container'
import Cargando from './cargador/cargando'
import Bienvenido from './nuevousuario/bienvenido'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            precargado:0
        }
    }
    componentDidMount(){
        setTimeout(()=>this.setState({precargado:1}), 2000);
        
    }
    render() {
        if (this.props.usuario!=null) {
            if (this.state.precargado==1) {
                if (this.props.info.registrado==false&&this.state.precargado==1) {
                    return(<Bienvenido/>)
                }
                else{
                    return (
                        <div className="d-flex" id="wrapper">
                            <Sidebar/>
                            <Container/>
                        </div>
                    )
                }
            }
            else{
                return(
                    <Cargando/>
                )
            }
        }
        else{
            return(
                <Redirect to="/login"/>
            )
        }
    }
}

const mapStateProps = state =>({
    usuario: state.usuario,
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