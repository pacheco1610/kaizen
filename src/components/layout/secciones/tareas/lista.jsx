import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from "moment";

class lista extends Component {
    constructor(props){
        super(props)
        this.state={
            tareas:this.props.tareas
        }
    }
    componentDidUpdate(prevprop){
        if (this.props.tareas != prevprop.tareas) {
            this.setState({tareas:this.props.tareas})
            console.log(this.props.tareas)
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
                                    <div className="col-12 rounded btn-row-check" id={tarea.key}>
                                        <div className="row align-items-center">
                                            <div className="col-1 listtarea">
                                                <button className="btn btn-check"><i className="far fa-check-circle"></i></button>
                                            </div>
                                            <div className="col-11 textTarea"  onClick={()=>this.toggleRight(tarea.titulo,1,tarea)}>
                                                <span>{tarea.titulo}</span>
                                                <span className="fecha-tarea float-right">{(tarea.fecha)}</span>
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
                                <div className="col-12 rounded btn-row-check">
                                    <div className="row align-items-center">
                                        <div className="col-1 listtarea">
                                            <button className="btn btn-check"><i className="far fa-check-circle"></i></button>
                                        </div>
                                        <div className="col-11 textTarea"  onClick={()=>this.toggleRight(tarea.titulo,1,tarea)}>
                                            {tarea.titulo}
                                            <span className="fecha-tarea float-right">{moment(tarea.fecha).format('DD/MM/YYYY')}</span>
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