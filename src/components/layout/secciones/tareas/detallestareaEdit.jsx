import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase'
import DatePicker, { DateInput , TimeInput } from '@trendmicro/react-datepicker';
import Dropdown from '@trendmicro/react-dropdown';

class detallestarea extends Component {
    constructor(props){
        super(props)
        this.state={
            evidencia:"",
            date: moment(this.props.tarea.fecha).format('YYYY-MM-DD'),
            responsables:[],
            filter:this.props.colaboradores,
        }
    }

    tareaFinalizada(tarea){
        //this.notifyTopCenter('success',<Evidencia tarea={tarea}/>)
        document.getElementById("evidencia").classList.toggle("evidencia")
    }
    DropdownColaboradorOut(){
        if (this.state.filter.length===0) {
         document.querySelector('.dropdownCol').classList.add('toggle')
        }
    }
    DropdownColaborador(){
         document.querySelector('.dropdownCol').classList.remove('toggle')
    }
    removeResponsable(responsable){
        firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables').once("value").then((snapshot)=>{
            const historial =[]
                if (this.props.tarea.historial) {
                    const historial=this.props.tarea.historial
                    historial.push({
                        photoURL:responsable.photoURL,
                        displayname:responsable.displayname,
                        texto:'fue eliminado de la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                }else{
                    historial.push({
                        photoURL:this.props.usuario.photoURL,
                        displayname:this.props.usuario.displayname,
                        texto:'fue eliminado de la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                }
            firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables/'+snapshot.val().findIndex(responsable1 => responsable1.referencia === responsable.referencia)).update({estatustarea:'ELIMINADO'})
            firebase.database().ref('tareas/'+this.props.tarea.key).update({historial:historial})
        })
    }
    addResponsable(responsable){
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
            this.setState({responsables:responsables,text:'',filter:this.state.filter.filter(res=> res.referencia!== responsable.referencia)})
            document.querySelector('.dropdownCol').classList.add('toggle')
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
    Tareaevidenciada(){
        if (this.state.evidencia!="") {
            firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables').once("value").then((snapshot)=>{
                const historial =[]
                if (this.props.tarea.historial) {
                    const historial=this.props.tarea.historial
                    historial.push({
                        photoURL:this.props.usuario.photoURL,
                        displayname:this.props.usuario.displayname,
                        texto:'termino la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                }else{
                    historial.push({
                        photoURL:this.props.usuario.photoURL,
                        displayname:this.props.usuario.displayname,
                        texto:'termino la tarea',
                        fecha:moment().format('YYYY-MM-DD'),
                        tHistorial:"Historial"
                    })
                }
                firebase.database().ref('tareas/'+this.props.tarea.key+'/responsables/'+snapshot.val().findIndex(responsable => responsable.referencia === this.props.usuario.referencia)).update({estatustarea:'realizada',evidencia:this.state.evidencia})
                firebase.database().ref('tareas/'+this.props.tarea.key).update({historial:historial})
            }
        )
        document.getElementById('wrapper-Container').classList.toggle('toggled')
        }else{
            this.notifyTopCenter('warning',"Evidencia tu tarea")
        }
        
    }
    notifyTopCenter = (type,text) =>
    toast[type](text, {
        position: toast.POSITION.TOP_CENTER
    })
       HandleClickCalendar(date){
    this.setState({ date: date });
    document.querySelector('.dropdwonToggle').classList.remove('dropdown---open---1ju75')
    document.querySelector('.dropdwonToggle').classList.remove('buttons---open---1ju75')
    document.querySelector('.btn-edit-dropp').setAttribute("aria-expanded", "false")
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
                                                this.setState({ date: value });
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
                                    <div className="TextResponsables">
                                        <input value={this.state.text} onChange={(text) => this.filter(text)} onBlur={()=>this.DropdownColaboradorOut()} onFocus={()=>this.DropdownColaborador()} className="inputResponsables" placeholder="" type="text"/>
                                    </div>
                                    <div className="dropdownCol shadow toggle">
                                        {this.state.filter.map(colaborador=>
                                            <div key={colaborador.referencia} className="col-12 btn btn-colaboradores" onClick={()=>this.addResponsable(colaborador)}><span className="title-colaborador"><img src={colaborador.photoURL} alt="..." className="img-colaborador rounded-circle img-thumbnail mr-2" /> {colaborador.displayname} <small>{colaborador.puesto.Puesto}</small></span></div>
                                        )}
                                    </div>
                            </div>
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
                <div className="col-12 mb-2 evidencia" id="evidencia">
                    <div className="row">
                        <div className="col-12">
                            <div className="container comentarios p-2 mt-3 mb-2">
                                <textarea className="btn-block textareaComent" placeholder="Realiza un comentario o pregunta" onChange={(e)=>this.setState({evidencia:e.target.value})} value={this.state.evidencia}/>
                            </div>
                            <button onClick={()=>this.Tareaevidenciada()} className="btn btn-block bg-check">Evidenciar Tarea</button>
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