import React, { Component } from 'react'
    
import SidebarRight from '../../dashboard/sidebarRight'
import Modal from '../../../modals/modal'
import NuevoCliente from './nuevocliente'
import Tabclientes from './tabclientes'
import ClienteInfo from './clienteinfo'

export default class clientes extends Component {
    constructor(props){
        super(props)
        this.state={
            TituloSideBar:'Agregar Prospecto',
            ModalOpen:false,
            renderView:0,
            tcliente:"sp",
            tclienteselect:'Agregar Prospectos'

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
                return(<NuevoCliente tcliente={this.state.tcliente}/>)
            case 1:
                return(<ClienteInfo/>)
            default:
                break;
        }
    }
    Tabs(titulo,tcliente){
        this.setState({TituloSideBar:titulo,tcliente:tcliente,tclienteselect:titulo})
    }
    componentDidMount(){
        let elements = document.getElementsByClassName('col-12')
        for (let index = 0; index < elements.length; index++) {
            elements[index].classList.remove('activo')
        }
        if ( document.getElementById('2')) {
            document.getElementById('2').classList.add('activo')   
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
                                    <h4 className="title-dashboard">Clientes</h4>
                                </nav> 
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <nav className="navbar navbar-expand-lg navbar-light">
                                                <button onClick={()=>this.toggleRight(this.state.tclienteselect,0)} className="btn btn-general">{this.state.tclienteselect}</button>
                                            </nav>
                                            
                                            <div className="row mt-4 tab-clientes">
                                                <nav>
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                        <a onClick={()=>this.Tabs('Agregar Prospecto','sp')} className="nav-item nav-link active" name="prospectos" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Prospectos</a>
                                                        <a onClick={()=>this.Tabs('Agregar Contactado','p')} className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Contactados</a>
                                                        <a onClick={()=>this.Tabs('Agregar Cliente Activo','c')}className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Clientes Activos</a>
                                                        <a onClick={()=>this.Tabs('Agregar Cliente Satisfecho','cs')}className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-satisfechos" role="tab" aria-controls="nav-satisfechos" aria-selected="false">Clientes Satisfecho</a>
                                                    </div>
                                                </nav>
                                                <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" name="Propspecto" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"> 
                                                        <Tabclientes toggleRight={this.toggleRight} tc='sp'/>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                        <Tabclientes toggleRight={this.toggleRight} tc='p'/>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                        <Tabclientes toggleRight={this.toggleRight} tc='c'/>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-satisfechos" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                        <Tabclientes toggleRight={this.toggleRight} tc='cs'/>
                                                    </div>
                                                </div>
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
