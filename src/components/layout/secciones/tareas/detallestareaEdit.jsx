import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase'
import DatePicker, { DateInput , TimeInput } from '@trendmicro/react-datepicker';
import Dropdown from '@trendmicro/react-dropdown';
import Modal from '../../../modals/modal'

class detallestarea extends Component {
    constructor(props){
        super(props)
        this.state={
            evidencia:"",
            date: moment(this.props.tarea.fecha).format('YYYY-MM-DD'),
            responsables:[],
            filter:this.props.colaboradores,
            ModalOpen:false,
            cliente:[]
        }
    }

    DropdownColaborador(){
        document.querySelector('.dropdownCol').classList.toggle('toggle')
        document.querySelector('.dropdownCol-Cover').classList.toggle('toggle')
    }
    isClose=()=>{
        this.setState({ModalOpen:false})
    }
    removeResponsable(responsable){
        firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables').once("value").then((snapshot)=>{
            
                if (this.props.tarea.historial) {
                    const historial=this.props.tarea.historial
                    historial.push({
                        photoURL:responsable.photoURL,
                        displayname:responsable.displayname,
                        texto:'fue eliminado de la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                    firebase.database().ref('tareas/'+this.props.tarea.key).update({historial:historial})
                }else{
                    const historial =[]
                    historial.push({
                        photoURL:responsable.photoURL,
                        displayname:responsable.displayname,
                        texto:'fue eliminado de la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                    firebase.database().ref('tareas/'+this.props.tarea.key).update({historial:historial})
                }
            firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables/'+snapshot.val().findIndex(responsable1 => responsable1.referencia === responsable.referencia)).update({estatustarea:'eliminado'})
        })
    }
    addResponsable(responsable){
        firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables').once("value").then((snapshot)=>{
            const Index = snapshot.val().findIndex(responsable1 => responsable1.referencia === responsable.referencia)
            if (Index !== -1) {
                firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables/'+Index).update({estatustarea:'pendiente'})
            }else{
                const responsables=this.props.tarea.responsables
                responsables.push({
                            displayname:responsable.displayname,
                            empresa:responsable.empresa,
                            estatus:responsable.estatus,
                            permisos:responsable.permisos,
                            photoURL:responsable.photoURL,
                            referencia:responsable.referencia,
                            estatustarea:'pendiente',
                            fechaAsignada:moment().format('YYYY-MM-DD')
                    })
                    firebase.database().ref('tareas/'+this.props.tarea.key).update({responsables:responsables})
                    }
            })
            
                if (this.props.tarea.historial) {
                    const historial=this.props.tarea.historial
                    historial.push({
                        photoURL:responsable.photoURL,
                        displayname:responsable.displayname,
                        texto:'fue agregado a la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                    firebase.database().ref('tareas/'+this.props.tarea.key).update({historial:historial})
                }else{
                    const historial =[]
                    historial.push({
                        photoURL:responsable.photoURL,
                        displayname:responsable.displayname,
                        texto:'fue agregado a la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                    firebase.database().ref('tareas/'+this.props.tarea.key).update({historial:historial})
                }
                document.querySelector('.dropdownCol').classList.toggle('toggle')
                document.querySelector('.dropdownCol-Cover').classList.toggle('toggle')
    }
    filter(event){
        var text = event.target.value
          const data = this.props.colaboradores
          const newData = data.filter(function(item){
              const itemDataTitle = item.displayname.toUpperCase()
              const itemDataDescp = item.puesto.Puesto.toUpperCase()
              const campo = itemDataTitle+" "+itemDataDescp
              const textData = text.toUpperCase()
              return campo.indexOf(textData) > -1
          })
          this.setState({
              filter: newData,
              text:text
          })
       }

    notifyTopCenter = (type,text) =>
    toast[type](text, {
        position: toast.POSITION.TOP_CENTER
    })
    HandleClickCalendar(date){
    this.setState({ date: date });
    firebase.database().ref(`tareas/${this.props.tarea.key}/`).update({fecha:date})
    document.querySelector('.dropdwonToggle').classList.remove('dropdown---open---1ju75')
    document.querySelector('.dropdwonToggle').classList.remove('buttons---open---1ju75')
    document.querySelector('.btn-edit-dropp').setAttribute("aria-expanded", "false")
   }
   texTarea(e){
    firebase.database().ref(`tareas/${this.props.tarea.key}/`).update({descripcion:e.target.value})
    var el = document.getElementById('Descripcion')
    setTimeout(function(){
      el.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
   }
   autorizarTarea(){
       let realizado=0
        this.props.tarea.responsables.map(responsable=>{
            if (responsable.estatustarea==="realizada") {
                realizado=realizado+1
            }else if(responsable.estatustarea==="eliminado"){
                realizado=realizado+1
            }
        })
        if (realizado === this.props.tarea.responsables.length) {
            firebase.database().ref(`tareas/${this.props.tarea.key}/`).update({estatus:"realizada"})
            document.getElementById('wrapper-Container').classList.toggle('toggled')
        }
        else{
            this.notifyTopCenter("warning","No todos los colaboradores realizaron la tarea")
        }
   }
   renderCliente(cliente){
        this.setState({ModalOpen:true,cliente:cliente})
   }
   renderClientes(){
       if (this.props.tarea.clientes) {
            return(
                this.props.tarea.clientes.map(cliente=>
                    <a className="title-tarea btn mb-2" onClick={()=>this.renderCliente(cliente)}><u>{cliente.empresa}</u></a>
                )
            )
       }
       else{
           return(<span className="title-tarea btn-block mb-2">Sin Clientes Relacionados</span>)
       }
   }
    render() { 
        return (
            <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-12 mb-2">
                    <div className="row">
                       <div className="col-12 col-md-12 col-xl-12">
                         <span className="title-tarea  ">Fecha de entrega</span>
                         <Dropdown className="dropdwonToggle">
                                    <Dropdown.Toggle
                                        btnStyle="link"
                                        noCaret
                                        style={{ padding: 0, border: 1, backgroundColor: 'white' }}
                                        className="btn-edit-dropp"
                                    >
                                        <DateInput
                                            value={this.state.date}
                                            onChange={value => {
                                                this.HandleClickCalendar(value);
                                            }}
                                        />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ padding: 8 }}>
                                        <DatePicker
                                            date={this.state.date}
                                            onSelect={date =>this.HandleClickCalendar(date)}
                                        />  
                                    </Dropdown.Menu>
                                </Dropdown>
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
                                                    <div className="col-8 text-left">
                                                        <i className="fas fa-check mr-2"></i>
                                                        {responsable.displayname}
                                                    </div>
                                                    <div className="col-4 fecha-tarea">
                                                        finalizada
                                                    </div>
                                                </div>
                                            </div> 
                                        )
                                        
                                    }
                                    if (responsable.estatustarea==="pendiente") {
                                        return(
                                            <div className="col-12 p-2 bg-light rounded mb-2">
                                                <div className="row align-items-center badgestareas">
                                                    <div className="col-7 text-left">
                                                        <i className="far fa-clock mr-2"></i>
                                                        <img src={responsable.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" />
                                                        {responsable.displayname}
                                                    </div>
                                                    <div className="col-5 fecha-tarea">
                                                        pendiente
                                                        <button onClick={()=>this.removeResponsable(responsable)} className="btn"><i className="fas fa-minus-circle"></i></button>
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
                                <div className="col-12 col-md-12 col-xl-12">
                                    <span className="title-tarea btn-block">Agregar Responsables</span>
                                    <div className="TextResponsables"  id="responsables">
                                        <input value={this.state.text} onChange={(text) => this.filter(text)} onFocus={()=>this.DropdownColaborador()} className="inputSelect" placeholder="" type="text"/>
                                    </div>
                                    <div className="dropdownCol shadow toggle">
                                        {this.state.filter.map(colaborador=>
                                            <div key={colaborador.referencia} className="col-12 btn btn-colaboradores" onClick={()=>this.addResponsable(colaborador)}><span className="title-colaborador"><img src={colaborador.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" /> {colaborador.displayname} <small>{colaborador.puesto.Puesto}</small></span></div>
                                        )}
                                    </div>
                                    <div onClick={()=>this.DropdownColaborador()} className="dropdownCol-Cover toggle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-3 mt-3">
                    <div className="row">
                        <div className="col-12 col-md-12 col-xl-12">
                            <span className="title-tarea btn-block">Clientes Relacionados:</span>
                            {this.renderClientes()}
                        </div>
                        <div className="col-12 col-md-12 col-xl-12">
                            <div className="TextResponsables" >
                            <span className="title-tarea btn-block">Descripción</span>
                                <textarea id="Descripcion" className="TextDescripcion" value={this.props.tarea.descripcion} onChange={(e)=>this.texTarea(e)} placeholder="Agreaga descripción"/>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="row">
                        <div className="col-12">
                            <button onClick={()=>this.autorizarTarea()} className="btn btn-block btn-general"><i className="far fa-check-circle"></i> Autorizar Tarea</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={this.state.ModalOpen}  isClose={this.isClose}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-2">
                            <h1>Detalles del cliente</h1>
                        </div>
                        <div className="col-6 mb-2">
                            <span className="title-tarea btn-block mb-2">Nombre:</span>
                            {this.state.cliente.nombre}
                        </div>
                        <div className="col-6 mb-2">
                            <span className="title-tarea btn-block mb-2">Apellido:</span>
                            {this.state.cliente.apellido}
                        </div>
                        <div className="col-6 mb-2">
                            <span className="title-tarea btn-block mb-2">Email:</span>
                            {this.state.cliente.email}
                        </div>
                        <div className="col-6 mb-2">
                            <span className="title-tarea btn-block mb-2">telefono:</span>
                            {this.state.cliente.telefono}
                        </div>
                    </div>
                </div>
            </Modal>
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