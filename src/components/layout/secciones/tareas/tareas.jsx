import React, { Component } from 'react'
import SidebarTarea from '../../dashboard/sidebarTarea'
import Modal from '../../../modals/modal'
import Lista from './lista'
import Ntarea from './nuevatarea'
import DetallesTarea from './detallestarea'
import {connect} from 'react-redux'

class tareas extends Component {
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
        if (render===0) {
            this.props.tareadetalles('')
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
                return(<Ntarea/>)
            case 1:
                return(<DetallesTarea/>)
            default:
                break;
        }
    }
    componentDidMount(){
    if (document.getElementById('1')) {
        document.getElementById('1').classList.add('activo')
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
                                    <h4 className="title-dashboard">Tareas</h4>
                                </nav> 
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row justify-content-between">
                                                <div className="col-12">
                                                    <nav className="navbar navbar-expand-lg navbar-light">
                                                        <button onClick={()=>this.toggleRight('Nueva Tarea',0)} className="btn btn-general">Nueva Tarea</button>
                                                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                                            <li className="nav-item">
                                                                <button onClick={()=>this.calendar()} className="btn"><i className="fas fa-list-ol"></i></button>
                                                                <button onClick={()=>this.calendar()} className="btn"><i className="far fa-calendar-alt"></i></button>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                            <div className="row mt-4 tab-clientes">
                                                <Lista toggleRight={this.toggleRight}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <SidebarTarea titulo={this.state.TituloSideBar} toggleClose={this.toggleClose}>
                {this.renderView()}
            </SidebarTarea>
            <Modal isOpen={this.state.ModalOpen}  isClose={this.isClose}>
                {this.renderView()}
            </Modal>
        </div>    
        )
    }
}

const mapStateProps = state =>({
    colaboradores:state.colaboradores,
    tarea:state.tareadetalles,
    usuario:state.info
})
const mapDispatchToprops = dispatch =>({
    tareadetalles(tareadetalles){
        dispatch({
          type:'Tarea',
          tareadetalles
        })
      },
})
export default connect(mapStateProps,mapDispatchToprops)(tareas);