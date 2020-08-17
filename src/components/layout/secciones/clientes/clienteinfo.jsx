import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import { ToastContainer, toast } from 'react-toastify';

class clienteinfo extends Component {
    constructor(props){
        super(props)
        this.state={
            nombre:this.props.infoCliente.info.nombre,
            apellido:this.props.infoCliente.info.apellido,
            email:this.props.infoCliente.info.email,
            telefono:this.props.infoCliente.info.telefono,
            empresa:this.props.infoCliente.info.empresa,
            tcliente:this.props.infoCliente.info.tcliente
        }
        
    }
    renderview(){
        switch (this.state.tcliente) {
            case 'sp':
                return('Prospecto')
            case 'p':
                return('Contactado')
            case 'c':
                return('Cliente Activo')
            case 'cs':
                return('Cliente Satisfecho')
            default:
                break;
        }
    }
    componentDidMount(){
        document.getElementById('guardar').setAttribute('disabled','disabled')
    }
    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar los props):
        if (this.props.infoCliente !== prevProps.infoCliente) {
          this.setState({
            nombre:this.props.infoCliente.info.nombre,
            apellido:this.props.infoCliente.info.apellido,
            email:this.props.infoCliente.info.email,
            telefono:this.props.infoCliente.info.telefono,
            empresa:this.props.infoCliente.info.empresa,
            tcliente:this.props.infoCliente.info.tcliente
          })
          document.getElementById('guardar').setAttribute('disabled','disabled')
        }
      }
      handleChangeSelect = ()  => {
        document.getElementById('guardar').removeAttribute('disabled')
        let select = document.getElementById('selectmenu');
        if (select.value!=0) {
            this.setState({tcliente:select.value})
        }
    };
    handleChange(event,nombre){
        this.setState({[nombre]: event.target.value})
        document.getElementById('guardar').removeAttribute('disabled')
    }
    handleUpdate(){
        let inputs =document.getElementsByClassName('input-edit')
        let verificar=0
        for (let index = 0; index < inputs.length; index++) {
            if(inputs[index].value!==""){
                verificar=verificar+1
            }
        }
        if (verificar==inputs.length) {
            if (firebase.database().ref(`clientes/${this.props.infoCliente.key}`).update(this.state)) {
                this.notifyTopCenter('success','Cliente Actualizado Correctamente')
            } 
        }
        else{
            this.notifyTopCenter('warning','Rellena todos los campos')
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
                        <snap className="title-dashboard mr-2">Apellido:</snap>
                        <input type="text" id="nombre" className="input-edit" value={this.state.apellido} onChange={(e)=>this.handleChange(e,'apellido')}/>
                    </div>
                    <div className="col-12 mt-2">
                        <snap className="title-dashboard mr-2">Email:</snap>
                        <input type="text" id="nombre" className="input-edit" value={this.state.email} onChange={(e)=>this.handleChange(e,'email')}/>
                    </div>
                    <div className="col-12 mt-2">
                        <snap className="title-dashboard mr-2">Teléfono:</snap>
                        <input type="text" id="nombre" className="input-edit" value={this.state.telefono} onChange={(e)=>this.handleChange(e,'telefono')}/>
                    </div>
                    <div className="col-12 mt-2">
                        <snap className="title-dashboard mr-2">Empresa:</snap>
                        <input type="text" id="nombre" className="input-edit" value={this.state.empresa} onChange={(e)=>this.handleChange(e,'empresa')}/>
                    </div>
                    <div className="col-12 mt-2 mb-2">
                        <snap className="title-dashboard mr-2">Cambiar estatus:</snap>
                        <select className="input-edit" onChange={this.handleChangeSelect} id="selectmenu">
                            <option value='0'>{this.renderview()}</option>
                            <option value="sp">Prospecto</option>
                            <option value="p">Contactado</option>
                            <option value="c">Cliente Activo</option>
                            <option value="cs">Cliente Satisfecho</option>
                        </select>
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
    infoCliente:state.infocliente
})
export default connect(mapStateProps,null)(clienteinfo);