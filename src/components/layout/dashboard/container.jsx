import React, { Component } from 'react'
import {connect} from 'react-redux'

import Navbar from './navbar'
import Clientes from '../secciones/clientes/clientes'
import Colaboradores from '../secciones/colaboradores/colaboradores'
import PerfilPuestos from '../secciones/perfilDePuestos/perfil'
import Tareas from '../secciones/tareas/tareas'

class conainer extends Component {
    constructor(props){
        super(props)
        this.state={
            ModalOpen:false
        }
    }
    toggle=()=>{
        if (window.screen.width >= 1024){
            document.getElementById('wrapper').classList.toggle('toggled')
        }
        else{
            this.setState({ModalOpen:true})
        }
    }
    isClose=()=>{
        this.setState({ModalOpen:false})
    }
    renderView(){
        switch (this.props.menuview) {
            case 1:
                return(<Tareas/>)
            case 2:
                return(<Clientes/>)
            case 3:
                return(<Colaboradores/>)
            case 4:
                return(<PerfilPuestos/>)
            default:
                break;
        }
    }

    render() {
        return (
            <div id="page-content-wrapper">
               <Navbar toggle={this.toggle} isOpen={this.state.ModalOpen} isClose={this.isClose}/>
                <div className="container-fluid">
                    {this.renderView()}
                </div>
            </div>
        )
    }
}
const mapStateProps = state =>({
    menuview: state.menuview,
})

const mapDispatchToprops = dispatch =>({
    UpdateUsuario(usuario){
      dispatch({
        type:'usuario',
        usuario
      })
    },
})
export default connect(mapStateProps,mapDispatchToprops)(conainer)