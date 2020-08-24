import React, { Component } from 'react'
import {connect} from 'react-redux'

import DatePicker, { DateInput , TimeInput } from '@trendmicro/react-datepicker';
import Dropdown from '@trendmicro/react-dropdown';
import moment from "moment";
import firebase from 'firebase'
import { ToastContainer, toast } from 'react-toastify';

require('moment/locale/es.js');
class nuevatarea extends Component {
   constructor(props){
       super(props)
       this.state={
        titulo:'',
        descripcion:'',
        date: moment().format('YYYY-MM-DD'),
        responsables:[],
        filter:this.props.colaboradores,
        text:'',
        time:moment().format('hh:mm:ss')
        };
   }

   DropdownColaborador(){
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
   removeResponsable(responsable){
       const {filter}=this.state
       let res = this.props.colaboradores.filter(colaborador => colaborador.referencia === responsable.referencia)
       filter.push(res[0])
    this.setState({responsables:this.state.responsables.filter(item=>item.referencia!==responsable.referencia)})
   }
   addResponsable(responsable){
       const {responsables}=this.state
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
        this.setState({responsables:responsables,text:'',filter:this.state.filter.filter(res=> res.referencia!== responsable.referencia)})
        document.querySelector('.dropdownCol').classList.toggle('toggle')
        document.querySelector('.dropdownCol-Cover').classList.toggle('toggle')
   }
   HandleClickCalendar(date){
    this.setState({ date: date });
    document.querySelector('.dropdwonToggle').classList.remove('dropdown---open---1ju75')
    document.querySelector('.dropdwonToggle').classList.remove('buttons---open---1ju75')
    document.querySelector('.btn-edit-dropp').setAttribute("aria-expanded", "false")
   }
   AltaTarea(){
       if (this.state.titulo!=='' && this.state.responsables.length>0) {
        const tarea={
            titulo:this.state.titulo,
            descripcion:this.state.descripcion,
            fecha:this.state.date,
            responsables:this.state.responsables,
            empresa:this.props.usuario.empresa,
            asignador:this.props.usuario,
            estatus:'pendiente',
            fechaCreada:moment().format('YYYY-MM-DD'),
            
        }
        if (firebase.database().ref('tareas').push(tarea)) {
            this.notifyTopCenter('success','Tarea agregada correctamente')
            this.setState({
             titulo:'',
             descripcion:'',
             date: moment().format('YYYY-MM-DD'),
             responsables:[],
             filter:[],
             text:'',
             empresa:'',
             asignador:'',
             estatus:''
            })
        }
       }else{
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
                <div className="row">
                    <div className="col-12 mb-3">
                        <input value={this.state.titulo} onChange={(e)=>this.setState({titulo:e.target.value})} type="text" name="Titulo" className="form-control rounded-1" placeholder="Titulo de la tarea"/>
                    </div>
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
                                         <TimeInput
                                            value={this.state.time}
                                            onChange={value => {
                                                this.setState({ time: value });
                                            }}
                                            style={{ top: 8,bottom:8}}
                                        />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="row">
                            <div className="col-12 col-md-12 col-xl-12">
                                <span className="title-tarea mr-2">Responsables</span> 
                            </div>
                            <div className="col-12 col-md-12 col-xl-12">
                                <div className="TextResponsables" id="responsables">
                                    {this.state.responsables.map(responsable=>
                                            <span key={responsable.referencia} className="badge badge-pill badge-light badgedResponsable m-1">
                                                <label htmlFor="" className="mt-1" >{responsable.displayname}</label> <button className="btn btn-default btn-circle ml-1" onClick={()=>this.removeResponsable(responsable)} >x</button>
                                            </span>
                                        )}
                                    <input value={this.state.text} onChange={(text) => this.filter(text)} onFocus={()=>this.DropdownColaborador()} className="inputResponsables" placeholder="" type="text"/>
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
                    <div className="col-12 mb-2">
                        <div className="row">
                            <div className="col-12 col-md-12 col-xl-12">
                                <span className="title-tarea  mr-2">Descripción</span>
                            </div>
                            <div className="col-12 col-md-12 col-xl-12">
                                <textarea value={this.state.descripcion} onChange={(e)=>this.setState({descripcion:e.target.value})} name="" className="TextResponsables" placeholder="Agregar mas detalles a esta tarea"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <button onClick={()=>this.AltaTarea()} className="btn btn-general btn-block">Asignar Tarea</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateProps = state =>({
    colaboradores:state.colaboradores,
    usuario:state.info,
})
export default connect(mapStateProps,null)(nuevatarea);