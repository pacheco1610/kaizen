import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase';
import 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';

class nuevocolaborador extends Component {
    constructor(props){
        super(props)
        this.state={
            permisos:[
                {
                icono:"fas fa-calendar-check",
                key:1,
                titulo:'Tareas',
                direccion:'/'
                }
            ],
            puesto:'',
            referencia:'',
            nombre:'',
            celular:''
        }
    }
    handlePermiso(){
        let selectPer = document.getElementById('selectPermisos');
        if (selectPer.value!=='0') {
            document.getElementById(selectPer.value).disabled=true
            let permiso = this.props.permisos.filter(permiso=>permiso.direccion===selectPer.value)
            const {permisos} = this.state
            permisos.push(permiso[0])
            this.setState({permisos:permisos})
        }
        else{
            this.setState({selectedOption:null})
        }
    }
    removePermiso(permiso){
        const {permisos}=this.state
        if (permiso.direccion!=='/') {
            document.getElementById(permiso.direccion).disabled=false
            let filtropermisos = permisos.filter(permisofil=>permisofil.direccion!==permiso.direccion)
            this.setState({permisos:filtropermisos})
        }
       
    }

    handleChangeSelect = ()  => {
        let select = document.getElementById('selectmenu');
        if (select.value!==0) {
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
            let elemetDisabled = document.getElementsByClassName('optionPermisos')
            for (let index = 0; index < elemetDisabled.length; index++) {
                elemetDisabled[index].disabled=false
            }
            this.setState({selectedOption:'',
            nombre:'',
            permisos:[
                {
                icono:"fas fa-calendar-check",
                key:1,
                titulo:'Tareas',
                direccion:'/'
                }
            ]})
            this.notifyTopCenter()
        }
        this.setState({referencia:params.referencia})
    }
    notifyTopCenter = () =>
    toast.success("Colaborador agregado correctamente", {
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
                                <select className="custom-select col-12 mb-2" id="selectPermisos" onChange={()=>this.handlePermiso()}>
                                    <option value='0'>Agregar Permisos</option>
                                    {this.props.permisos.map(permiso=>
                                        <option className="optionPermisos" key={permiso.key} id={permiso.direccion} value={permiso.direccion}>{permiso.titulo}</option>
                                    )}
                                </select>
                                
                                <div className="col-12">
                                    <div className="row">
                                        {this.state.permisos.map(permiso=>
                                            <div className="col-12 p-2 bg-check rounded mb-2">
                                                <div className="row align-items-center badgestareas">
                                                    <div className="col-12 text-left">
                                                        <button onClick={()=>this.removePermiso(permiso)} className="btn text-white"><i className="fas fa-minus-circle"></i></button>
                                                        Tiene permisos de {permiso.titulo}
                                                    </div>
                                                </div>
                                            </div> 
                                        )}
                                    </div>
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