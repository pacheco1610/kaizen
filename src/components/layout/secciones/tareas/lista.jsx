import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from "moment";
import Table from './table'

class lista extends Component {
    constructor(props){
        super(props)
        this.state={
            tarea:{}
        }
    }
    componentDidUpdate(prevprop){
        if (this.props.tareas !== prevprop.tareas) {
            this.props.tareas.map(tarea=>{
                    if (tarea.key===this.state.tarea.key) {
                        this.props.tareadetalles(tarea)
                    }
            }
            )
        }
        if (this.props.tareasAsignadas !== prevprop.tareasAsignadas) {
            this.props.tareasAsignadas.map(tarea=>{
                    if (tarea.key===this.state.tarea.key) {
                        this.props.tareadetalles(tarea)
                    }
            }
        )
        }
    }
    toggleTarea(id){
        if(document.getElementById(id).classList.contains('fa-angle-right')){
            document.getElementById(id).classList.remove('fa-angle-right')
            document.getElementById(id).classList.add('fa-angle-down')
            document.getElementById(`con${id}`).classList.toggle('toggled')
        }else{
            document.getElementById(id).classList.add('fa-angle-right')
            document.getElementById(`con${id}`).classList.toggle('toggled')
        }
    }
    toggleRight=(provid,render,tarea)=>{
        this.setState({tarea:tarea})
        this.props.toggleRight(provid,render)
        this.props.tareadetalles(tarea)
        this.props.UpdateShow('show')
    }
    toggleRightEdit=(provid,render,tarea)=>{
        this.setState({tarea:tarea})
        this.props.toggleRight(provid,render)
        this.props.tareadetalles(tarea)
        this.props.UpdateShow('show')
    }
    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <h4 className="title-dashboard"><button className="btn" onClick={()=>this.toggleTarea('TusTareas')}><i id="TusTareas" className="fas fa-angle-down"></i></button>Tus Nuevas Tareas</h4>
                        <div id="conTusTareas" className="container">
                            <div className="row">
                                {this.props.tareas.map(tarea=>
                                    <div className="col-12 rounded btn-row-check p-2" id={tarea.key} key={tarea.key}>
                                        <div className="container">
                                            <div className="row align-items-center" onClick={()=>this.toggleRight(tarea.titulo,1,tarea)}>
                                                <div className="col-5 textTarea" >
                                                    <span>{tarea.titulo}</span>
                                                </div>
                                                <div className="col-5 textTarea">
                                                    {tarea.responsables.map(responsable=>{
                                                        if (responsable.estatustarea==="realizada") {
                                                            return(<span className="badge bg-check rounded mr-1 p-1">{responsable.displayname}</span>)
                                                        }
                                                        if (responsable.estatustarea==="pendiente") {
                                                            return(<span className="badge bg-light rounded mr-1 p-1">{responsable.displayname}</span>)
                                                        }
                                                       
                                                    })}
                                                </div>
                                                <div className="col-2 textTarea">
                                                    <span className="fecha-tarea float-right">{moment(tarea.fecha).format('DD/MM/YYYY')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )} 
                                </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <h4 className="title-dashboard"><button className="btn" onClick={()=>this.toggleTarea('TareasAsignadas')}><i id="TareasAsignadas" className="fas fa-angle-down"></i></button>Tareas Asignadas</h4>
                        <div  id="conTareasAsignadas" className="container">
                                <div className="row">
                                {this.props.tareasAsignadas.map(tarea=>
                                    <div className="col-12 rounded btn-row-check p-2" id={tarea.key} key={tarea.key}>
                                        <div className="container">
                                            <div className="row align-items-center" onClick={()=>this.toggleRightEdit(tarea.titulo,2,tarea)}>
                                                <div className="col-5 textTarea" >
                                                    <span>{tarea.titulo}</span>
                                                </div>
                                                <div className="col-5 textTarea">
                                                    {tarea.responsables.map(responsable=>{
                                                        if (responsable.estatustarea==="realizada") {
                                                            return(<span className="badge bg-check rounded mr-1 p-1">{responsable.displayname}</span>)
                                                        }
                                                        if (responsable.estatustarea==="pendiente") {
                                                            return(<span className="badge bg-light rounded mr-1 p-1">{responsable.displayname}</span>)
                                                        }
                                                       
                                                    })}
                                                </div>
                                                <div className="col-2 textTarea">
                                                    <span className="fecha-tarea float-right">{moment(tarea.fecha).format('DD/MM/YYYY')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )} 
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateProps = state =>({
    colaboradores:state.colaboradores,
    tareas:state.Tareas,
    tareaevidencia:state.tareadetalles,
    tareasAsignadas:state.tareasAsignadas
})
const mapDispatchToprops = dispatch =>({
    tareadetalles(tareadetalles){
      dispatch({
        type:'Tarea',
        tareadetalles
      })
    },
      UpdateShow(show){
        dispatch({
          type:'Show',
          show
        })
      },
})
export default connect(mapStateProps,mapDispatchToprops)(lista);