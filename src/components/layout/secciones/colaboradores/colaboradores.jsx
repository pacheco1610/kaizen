import React, { Component } from 'react'

import SidebarRight from '../../dashboard/sidebarRight'
import Modal from '../../../modals/modal'
import TabColaborador from './tabcolaboradores'
import NuevoColaborador from './nuevocolaborador'
import InfoColaborador from './infocolaborador'

export default class colaboradores extends Component {
    constructor(props){
        super(props)
        this.state={
            TituloSideBar:'Titulo',
            ModalOpen:false,
            renderView:0,
        }
    }
    toggleRight=(provid,render)=>{
        this.setState({TituloSideBar:provid})
        if (window.screen.width > 1024){
            document.getElementById('wrapper-Container').classList.add('toggled')
            this.setState({renderView:render})
        }
        else{
                
                this.setState({ModalOpen:true,renderView:render})
        }
    }
    toggleClose=()=>{
        document.getElementById('wrapper-Container').classList.toggle('toggled')
    }
    isClose=()=>{
        this.setState({ModalOpen:false})
    }
    renderView(){
        switch (this.state.renderView) {
            case 0:
                return(<NuevoColaborador/>)
            case 3:
                return(<InfoColaborador/>)
            default:
                break;
        }
    }
    componentDidMount(){
        let elements = document.getElementsByClassName('col-12')
        for (let index = 0; index < elements.length; index++) {
            elements[index].classList.remove('activo')
        }
        if ( document.getElementById('3')) {
            document.getElementById('3').classList.add('activo')   
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
                                    <h4 className="title-dashboard">Colaboradores</h4>
                                </nav> 
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <nav className="navbar navbar-expand-lg navbar-light">
                                                <button onClick={()=>this.toggleRight('Agregar Colaborador',0)} className="btn btn-general">Agregar Colaborador</button>
                                            </nav>
                                            <div className="row mt-4 tab-clientes">
                                                <TabColaborador toggleRight={this.toggleRight}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <SidebarRight titulo={this.state.TituloSideBar} toggleClose={this.toggleClose}>
                {this.renderView()}
            </SidebarRight>
            <Modal isOpen={this.state.ModalOpen}  isClose={this.isClose}>
                {this.renderView()}
            </Modal>
        </div>   
        )
    }
}
