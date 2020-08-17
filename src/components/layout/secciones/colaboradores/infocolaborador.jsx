import React, { Component } from 'react'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

class infocolaborador extends Component {
    constructor(props){
        super(props)
        this.state={
            nombre:this.props.colaborador.displayname,
            puesto:this.props.colaborador.puesto.titulo,
            permisos:this.props.colaborador.permisos,
            referencia:this.props.colaborador.referencia,
            perProps:this.props.permisos
        }
        
    }
    componentDidMount(){
        document.getElementById('guardar').setAttribute('disabled','disabled')
    }
    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar los props):
        if (this.props.colaborador !== prevProps.colaborador) {
          this.setState({
            nombre:this.props.colaborador.displayname,
            puesto:this.props.colaborador.puesto.titulo,
            permisos:this.props.colaborador.permisos,
            referencia:this.props.colaborador.referencia,
            perProps:this.props.permisos 
          })
          document.getElementById('guardar').setAttribute('disabled','disabled')
        }
      }
    handleChange(event,nombre){
        this.setState({[nombre]: event.target.value})
        document.getElementById('guardar').removeAttribute('disabled')
    }
    removePermiso(permiso){
        let verificar=0
        for (let index = 0; index < this.state.perProps.length; index++) {
            if (this.state.perProps[index].key !== permiso.key) {
                verificar=verificar+0
            }
            else{
                verificar=verificar+1
            }
        }
        if (verificar===0) {
            const {perProps}=this.state
            perProps.push({
                titulo:permiso.titulo,
                icono:permiso.icono,
                key:permiso.key,
            })
        }
        
        this.setState({permisos:this.state.permisos.filter(item => item.key !== permiso.key)})
        document.getElementById('guardar').removeAttribute('disabled')
    }
    handlePermiso(permiso){
        let verificar=0
        for (let index = 0; index < this.state.permisos.length; index++) {
            if (this.state.permisos[index].key !== permiso.key) {
                verificar=verificar+0
            }
            else{
                verificar=verificar+1
            }
        }
        if (verificar===0) {
        const {permisos}=this.state
        permisos.push({
            titulo:permiso.titulo,
            icono:permiso.icono,
            key:permiso.key
        })
        this.setState({perProps:this.state.perProps.filter(item=> item.key !== permiso.key)})
        this.setState({permisos:permisos})
        document.getElementById('guardar').removeAttribute('disabled')
        }
        else{
            this.notifyTopCenter('warning','Permiso ya agregado')
        }
        
    }
    notifyTopCenter = (type,text) =>
    toast[type](text, {
        position: toast.POSITION.TOP_CENTER
    })
    render() {
        return (
            <div className="container">
            <ToastContainer />
            <div className="row infocliente">
                <div className="col-12 mt-2">
                    <snap className="title-dashboard mr-2">Nombre:</snap>
                    <input type="text" id="nombre" className="input-edit" value={this.state.nombre} onChange={(e)=>this.handleChange(e,'nombre')}/>
                </div>
                <div className="col-12 mt-2">
                    <snap className="title-dashboard mr-2">Puesto:</snap>
                    <select className="input-edit" onChange={this.handleChangeSelect} id="selectmenu">
                            <option value='0'>{this.state.puesto}</option>
                            {this.props.puestos.map(puesto=>
                                <option key={puesto.key} value={puesto.key}>{puesto.Puesto}</option>
                            )}
                        </select>
                </div>
                <div className="col-12 text-center mt-2 mb-2">
                    <div className="subtitle">
                        <hr/>
                        <div className="subtitle-text">
                            <h3 className="title-dashboard">Permisos</h3>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-12 col-xl-6 mb-xl-0 mb-md-2 mb-2">
                            {this.state.perProps.map(permiso=>
                                <span key={permiso.key} className="badge badge-pill badge-secondary mr-2 perm-badge" onClick={()=>this.handlePermiso(permiso)}>{permiso.titulo}</span>
                            )}
                        </div>
                        <div className="col-12 col-xl-6 border rounded-sm perm-box">
                            {this.state.permisos.filter(permiso=>permiso.key!==1).map(permiso=>
                                <span key={permiso.key} className="badge badge-pill badge-primary mr-2 perm-badge" onClick={()=>this.removePermiso(permiso)}>{permiso.titulo} x</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                            <div className="subtitle">
                                <hr/>
                                <div className="subtitle-text">
                                    <h3 className="title-dashboard">Referencia</h3>
                                </div>
                            </div>
                            <input value={this.state.referencia} type="text" name="nombre" className="form-control rounded-1 col-12 mb-2" placeholder="Referencia" readOnly/>
                </div>
            </div>
            <div className="d-flex">
                <div className="ml-auto">
                    <button className="btn btn-general" id="guardar" onClick={()=>this.handleUpdate()} >Guardar</button>
                </div>
            </div>
        </div>
        )
    }
}
const mapStateProps = state =>({
    permisos:state.permisos,
    colaborador:state.infoColaborador,
    puestos:state.puestos,
})
export default connect(mapStateProps,null)(infocolaborador)