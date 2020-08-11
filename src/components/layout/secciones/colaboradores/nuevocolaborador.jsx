import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase';
import 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';

class nuevocolaborador extends Component {
    constructor(props){
        super(props)
        this.state={
            perProps:this.props.permisos,
            permisos:[
                {
                icono:"fas fa-calendar-check",
                key:1,
                titulo:'Tareas'}
            ],
            puesto:'',
            referencia:'',
            nombre:''
        }
    }
    handlePermiso(permiso){
        const {permisos}=this.state
        permisos.push({
            titulo:permiso.titulo,
            icono:permiso.icono,
            key:permiso.key
        })
        this.setState({perProps:this.state.perProps.filter(item=> item.key != permiso.key)})
        this.setState({permisos:permisos})
    }
    removePermiso(permiso){
        const {perProps}=this.state
        perProps.push({
            titulo:permiso.titulo,
            icono:permiso.icono,
            key:permiso.key,
        })
        this.setState({permisos:this.state.permisos.filter(item => item.key != permiso.key)})
    }

    handleChangeSelect = ()  => {
        let select = document.getElementById('selectmenu');
        if (select.value!=0) {
            let puesto = this.props.puestos.filter(item=>item.key==select.value)
            this.setState({puesto:puesto[0]})
        }
        else{
            this.setState({selectedOption:null})
        }
    };
    HanldeColaborador(){
        const {permisos} = this.state
        const params={
            displayname:this.state.nombre,
            puesto:this.state.puesto,
            permisos:permisos,
            referencia:this.props.usuario.empresa+(Math.floor((Math.random() * 99) + 1)),
            empresa:this.props.usuario.empresa,
            estatus:'false',
            photoURL:'https://firebasestorage.googleapis.com/v0/b/kaizen-6d3d0.appspot.com/o/img%2Fdescarga.png?alt=media&token=109a3f25-aa79-4ab1-b4ac-5adf12f5875b'
        }
        
        if(firebase.database().ref('usuarios').push(params)){
            this.setState({selectedOption:'',nombre:'',perProps:this.state.perProps.concat(this.state.permisos.filter(item=>item.key!=1)),permisos:[]})
            this.notifyTopCenter()
        }
        this.setState({referencia:params.referencia})
        

    }
    notifyTopCenter = () =>
    toast.success("Puesto Agregado", {
        position: toast.POSITION.TOP_CENTER
    })
    render() {
        return (
            <div className="container">
                <ToastContainer />
                    <div className="row pt-3">
                        <input title="Tooltip on top" value={this.state.nombre} onChange={(e)=>{this.setState({nombre: e.target.value})}} type="text" name="nombre" className="form-control rounded-1 col-12 mb-2" placeholder="Nombre"/>
                        <select className="custom-select col-12 mb-2" id="selectmenu" onChange={this.handleChangeSelect}>
                            <option value='0'>Selecciona el puesto</option>
                            {this.props.puestos.map(puesto=>
                                <option key={puesto.key} value={puesto.key}>{puesto.Puesto}</option>
                            )}
                        </select>
                        <div className="col-12 text-center">
                            <div className="subtitle">
                                <hr/>
                                <div className="subtitle-text">
                                    <h3 className="title-dashboard">Permisos</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-xl-6 mb-xl-0 mb-md-2 mb-2">
                                    {this.state.perProps.map(permiso=>
                                        <span key={permiso.key} className="badge badge-pill badge-secondary mr-2 perm-badge" onClick={()=>this.handlePermiso(permiso)}>{permiso.titulo}</span>
                                    )}
                                </div>
                                <div className="col-12 col-xl-6 border rounded-sm perm-box">
                                    {this.state.permisos.map(permiso=>
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
                    <div className="row pt-2">
                            <div className="col-12">
                                <button className="btn btn-general btn-block" onClick={()=>this.HanldeColaborador()}>Agregar Colaborador</button>
                            </div>
                        </div>
            </div>
        )
    }
}

const mapStateProps = state =>({
    permisos:state.permisos,
    puestos:state.puestos,
    usuario:state.info
})

export default connect(mapStateProps,null)(nuevocolaborador)