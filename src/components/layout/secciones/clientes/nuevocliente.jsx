import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase';
import 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';

class nuevousuario extends Component {
    constructor(props){
        super(props)
        this.state={
            nombre:'',
            apellido:'',
            empresa:'',
            rubro:'',
            email:'',
            telefono:'',
            fecha:'',
            fuente:'',
            selectedOption:null
        }
    }
    handleChangeSelect = ()  => {
        let select = document.getElementById('selectmenu');
        if (select.value!==0) {
            this.setState({selectedOption:select.value})
        }
        else{
            this.setState({selectedOption:null})
        }
    };
    HandleCliente(){
        let inputs = document.getElementsByClassName('form-control')
        let verificar=0
        for (let index = 0; index < inputs.length; index++) {
                if(inputs[index].value!==""){
                    verificar=verificar+1
                }
                
        }
        if (verificar===inputs.length) {
            const params={
                nombre:this.state.nombre,
                apellido:this.state.apellido,
                empresa:this.state.empresa,
                rubro:this.state.rubro,
                empresa:this.state.empresa,
                email:this.state.email,
                telefono:this.state.telefono,
                tcliente:this.props.tcliente,
                fecha:firebase.database.ServerValue.TIMESTAMP,
                fuente:this.state.fuente,
                idempresa:this.props.infoUsuario.empresa
            }
            if(firebase.database().ref('clientes').push(params)){
                this.setState({
                    nombre:'',
                    apellido:'',
                    empresa:'',
                    rubro:'',
                    email:'',
                    telefono:'',
                    fecha:'',
                    fuente:'',
                })
                this.notifyTopCenter('success','Cliente Agregado')
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
                    <React.Fragment>
                        <div className="row">
                            <div className="col-12">
                                <input type="text" name="nombre" className="form-control rounded-1" placeholder="Nombre"
                                value={this.state.nombre}
                                onChange={(e)=>{this.setState({nombre: e.target.value});}}
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-12">
                                <input type="text" name="apellido" className="form-control rounded-1" placeholder="Apellido"
                                value={this.state.apellido}
                                onChange={(e)=>{this.setState({apellido: e.target.value} );}}
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-12">
                                <input type="text" name="empresa" className="form-control rounded-1" placeholder="Empresa"
                                value={this.state.empresa}
                                onChange={(e)=>{this.setState({empresa: e.target.value} );}}
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-12">
                                <input type="text" name="Rubro" className="form-control rounded-1" placeholder="Rubro"
                                value={this.state.rubro}
                                onChange={(e)=>{this.setState({rubro: e.target.value} );}}
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-12">
                                <input type="email" name="Rubro" className="form-control rounded-1" placeholder="Email"
                                value={this.state.email}
                                onChange={(e)=>{this.setState({email: e.target.value} );}}
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-12">
                                <input type="text" name="Rubro" className="form-control rounded-1" placeholder="Telefono"
                                value={this.state.telefono}
                                onChange={(e)=>{this.setState({telefono: e.target.value} );}}
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-12">
                                <input type="text" name="Rubro" className="form-control rounded-1" placeholder="Fuente de contacto"
                                value={this.state.fuente}
                                onChange={(e)=>{this.setState({fuente: e.target.value});}}
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-12">
                                <button className="btn btn-general btn-block" onClick={()=>this.HandleCliente()}>Guardar</button>
                            </div>
                        </div>
                    </React.Fragment>
            </div>
        )
    }
}

const mapStateProps = state =>({
    infoUsuario: state.info
})
const mapDispatchToprops = dispatch =>({

    UpdateClientes(clientes){
        dispatch({
          type:'clientes',
          clientes
        })
      },
})
export default connect(mapStateProps,mapDispatchToprops)(nuevousuario);