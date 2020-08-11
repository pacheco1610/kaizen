import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import Evidencia from './evidencia'

class detallestarea extends Component {
    tareaFinalizada(tarea){
        this.notifyTopCenter('success',<Evidencia tarea={tarea}/>)
    }
    notifyTopCenter = (type,text) =>
    toast[type](text, {
        position: toast.POSITION.BOTTOM_LEFT
    })
    render() { 
        return (
            <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-12 mb-2">
                    <div className="row">
                       <div className="col-12 col-md-12 col-xl-12">
                        <span className="title-tarea  ">Fecha de entrega {moment(this.props.tarea.fecha).format('DD/MM/YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="row">
                        <div className="col-12">
                            <span className="title-tarea mr-2">Responsables</span>
                            <div className="row">
                                {this.props.tarea.responsables.map(responsable=>{
                                    if (responsable.estatustarea==="realizada") {
                                        return(
                                            <div className="col-12 p-2 bg-check rounded mb-2">
                                                <div className="row align-items-center badgestareas">
                                                    <div className="col-6 text-left">
                                                        <i className="fas fa-check mr-2"></i>
                                                        {responsable.displayname}
                                                    </div>
                                                    <div className="col-6 fecha-tarea">
                                                        tarea finalizada
                                                    </div>
                                                </div>
                                            </div> 
                                        )
                                        
                                    }
                                    if (responsable.estatustarea==="pendiente") {
                                        return(
                                            <div className="col-12 p-2 bg-light rounded mb-2">
                                                <div className="row align-items-center badgestareas">
                                                    <div className="col-6 text-left">
                                                        <i className="far fa-clock mr-2"></i>
                                                        <img src={responsable.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" />
                                                        {responsable.displayname}
                                                    </div>
                                                    <div className="col-6 fecha-tarea">
                                                        Tarea pendiente
                                                    </div>
                                                </div>
                                            </div> 
                                        )
                                        
                                    }
                                    if (responsable.estatustarea==="avance") {
                                        return(
                                            <div className="col-12 p-2 bg-avance rounded mb-2">
                                                <div className="row align-items-center badgestareas">
                                                    <div className="col-6 text-left">
                                                        <i className="far fa-clock mr-2"></i>
                                                        {responsable.displayname}
                                                    </div>
                                                    <div className="col-6 fecha-tarea">
                                                        Tarea con avance de {responsable.avance}%
                                                    </div>
                                                </div>
                                            </div> 
                                        )
                                        
                                    }
                                }
                                      
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="row">
                        <div className="col-12 col-md-12 col-xl-12">
                            <span className="title-tarea  mr-2">Descripción <br/>{this.props.tarea.descripcion}</span>
                           
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="row">
                        <div className="col-12">
                            <button onClick={()=>this.tareaFinalizada(this.props.tarea)} className="btn btn-block btn-general"><i className="far fa-check-circle"></i> Finalizar Tarea</button>
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
    tarea:state.tareadetalles,
    usuario:state.info,
})
const mapDispatchToprops = dispatch =>({
    updateEvidencia(evidencia){
        dispatch({
          type:'Evidencia',
          evidencia
        })
      },
})

export default connect(mapStateProps,mapDispatchToprops)(detallestarea);