import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase';
import 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';

class nuevocolaborador extends Component {
    constructor(props){
        super(props)
        this.state={
            titulo:'',
            descripcion:''
        }
    }
    HandlePuesto(){
        const params={
            titulo:this.state.titulo,
            descripcion:this.state.descripcion,
            empresa:this.props.usuario.empresa,
            key:this.props.usuario.empresa+(Math.floor((Math.random() * 99) + 1))
        }
        if(firebase.database().ref('puestos').push(params)){
            this.setState({titulo:'',descripcion:''})
            this.notifyTopCenter()
        }
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
                        <input type="text" onChange={(e)=>{this.setState({titulo: e.target.value})}} name="nombre" className="form-control rounded-1 col-12 mb-2" placeholder="Nombre del Puesto" value={this.state.titulo}/>
                        <textarea value={this.state.descripcion} onChange={(e)=>{this.setState({descripcion: e.target.value})}} className="form-control col-12" rows="5" placeholder="Descripcion del puesto"></textarea>
                    </div>
                    <div className="row pt-2">
                        <button className="col-12 btn btn-general btn-block" onClick={()=>this.HandlePuesto()}>Guardar</button>
                    </div>
            </div>
        )
    }
}

const mapStateProps = state =>({
    usuario:state.info
})

export default connect(mapStateProps,null)(nuevocolaborador)