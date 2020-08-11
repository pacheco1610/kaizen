import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from "moment";

class sidebarTareas extends Component {
    constructor(props){
        super(props)
        this.state={
            btnComentar:'btncomentarioToggle'
        }
    }
    ToggleComentar(){
        this.setState({btnComentar:'btncomentario'})
    }
    toggleClose(show){
        this.props.toggleClose()
        this.props.UpdateShow(show)
    }
    renerHistorial(){
       if(this.props.tarea.historial) {
           return(
            this.props.tarea.historial.map(historia=>
                <div className="col-12 col-md-12 col-xl-12  mb-2">
                    <img src={historia.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" />
                        <span className="title-tarea mr-2">{historia.displayname} {historia.texto} {moment(historia.fecha).format('DD/MM/YYYY')}</span>
                </div>
            )
           )
        }
    }
    render() {
        return (
            <div id="sidebar-right">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bg-white rounded shadow mt-2">
                                <div className="container p-4">
                                    <nav className="navbar navbar-expand-lg">
                                        {this.props.tarea!=''? <h2>{this.props.tarea.titulo}</h2>:<h4 className="title-dashboard">{this.props.titulo}</h4>}
                                        <ul className="navbar-nav ml-auto">
                                            <button onClick={()=>this.toggleClose('show')} className="nav-item btn"><h4 className="title-dashboard">X</h4></button>
                                        </ul>
                                    </nav>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                {this.props.children}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.props.tarea!=''&&
                                <div className="bg-fotter">
                                    <div className="row">
                                        <div className="container mt-2">
                                            {this.renerHistorial()}
                                            <div className="col-12 col-md-12 col-xl-12 mb-2">
                                                <img src={this.props.tarea.asignador.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" />
                                                <span className="title-tarea mr-2">{this.props.tarea.asignador.displayname} te la asignó.</span>
                                                <span className="title-tarea">
                                                    {this.props.tarea.responsables.map(responsable=>
                                                        {
                                                            if (responsable.referencia===this.props.usuario.referencia) {
                                                                return(moment(responsable.fechaAsignada).format('DD/MM/YYYY'))
                                                            }
                                                        } 
                                                    )}
                                                </span>
                                                
                                            </div>
                                            <div className="col-12 col-md-12 col-xl-12  mb-2">
                                                <img src={this.props.tarea.asignador.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" />
                                                    <span className="title-tarea mr-2">{this.props.tarea.asignador.displayname} creó esta tarea. {moment(this.props.tarea.fechaCreada).format('DD/MM/YYYY')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-12">
                                            <div className="container comentarios">
                                                <textarea onClick={()=>this.ToggleComentar()} className="textareaComent" placeholder="Realiza un comentario o pregunta" name="" id=""></textarea>
                                                <div className={`row p-1 ${this.state.btnComentar}`}>
                                                    <div className="col-xl-8"></div>
                                                    <div className="col-xl-4">
                                                        <button className="btn btn-general btn-block">Comentar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
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
    usuario:state.info
})
const mapDispatchToprops = dispatch =>({
    UpdateShow(show){
        dispatch({
          type:'Show',
          show
        })
      },
})
export default  connect(mapStateProps,mapDispatchToprops)(sidebarTareas);