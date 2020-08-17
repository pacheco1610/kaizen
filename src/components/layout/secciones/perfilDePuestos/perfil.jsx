import React, { Component } from 'react'

import SidebarRight from '../../dashboard/sidebarRight'
import Modal from '../../../modals/modal'
import NuevoPerfil from './nuevoperfil'
import TabPerfil from './tabperfil'
import UpdatePerfil from './Updatenuevoperfil'

export default class perfil extends Component {
    constructor(props){
        super(props)
        this.state={
            TituloSideBar:'Titulo',
            ModalOpen:false,
            View:0,
            responsabilidad:'',
            responsabilidades:[]
        }
    }

    toggleClose=()=>{
        document.getElementById('wrapper-Container').classList.toggle('toggled')
    }
    toggleView=(render)=>{
        this.setState({View:render})
    }
    renderView(){
        switch (this.state.View) {
            case 0:
                return(<TabPerfil toggleView={this.toggleView}/>)
            case 1:
                return(<NuevoPerfil toggleView={this.toggleView}/>)
            case 2:
                return(<UpdatePerfil toggleView={this.toggleView}/>)
            default:
                break;
        }
    }
    componentDidMount(){
        let elements = document.getElementsByClassName('col-12')
        for (let index = 0; index < elements.length; index++) {
            elements[index].classList.remove('activo')
        }
        if ( document.getElementById('4')) {
            document.getElementById('4').classList.add('activo')   
        }
    }
    render() {
        return (
            <div className="d-flex" id="wrapper-Container">
            <div id="page-content-container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="container bg-white rounded shadow mt-2 p-4">
                                <nav className="navbar navbar-expand-lg">
                                    <h4 className="title-dashboard">Perfil de Puestos</h4>
                                </nav> 
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <nav className="navbar navbar-expand-lg navbar-light">
                                                <button onClick={()=>this.toggleView(1)} className="btn btn-general">Crear Puesto</button>
                                            </nav>
                                            {this.renderView()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <SidebarRight>
            </SidebarRight>
            <Modal isOpen={this.state.ModalOpen}  isClose={this.isClose}>
                {this.renderView()}
            </Modal>
        </div>  
        )
    }
}
