import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import { ToastContainer, toast } from 'react-toastify';

class nuevoperfil extends Component {
    constructor(props){
        super(props)
        this.state={
            general:'',
            diaria:'',
            semanal:'',
            quincenal:'',
            mensual:'',
            responsabilidaddiaria:'',
            responsabilidades:[],
            habilidades:this.props.habilidades,
            Puesto:'',
            Departamento:'',
            Organigrama:'',
            Horario:'',
            Proposito:'',
            Directamente:'',
            Edad:'',
            Sexo:'',
            Escolaridad:'',
            Experiencia:'',
            Manejo:'',
            Oficina:'',
            Otros:'',
            Elaboro:'',
            Reviso:'',
            Autorizo:'',
            Fecha:'',
            empresa:this.props.usuario.empresa,
            key:this.props.usuario.empresa.concat(Math.floor(Math.random() * (10000 - 1)) + 1)
        }
    }
    focusButton(button){
        document.getElementById(button).classList.add('btn-responsabilidad')
    }

    addResponsabilidad(tipo){
        const {responsabilidades}=this.state
        if (this.state[tipo]!="") {
            responsabilidades.push({
                key:this.state.responsabilidades.length,
                responsabilidad:this.state[tipo],
                tipo:tipo
            })
            this.setState({[tipo]:""})
        }
    }
    removeResponsabilidad(responsabilidad){
        this.setState({responsabilidades:this.state.responsabilidades.filter(item=>item.key != responsabilidad)})
    }
    check(habilidad){
        const {habilidades}=this.state
        const filtrado = habilidades.filter(habilidadFil=>habilidadFil.key!== habilidad.key)
        
        if (this.check) {
            filtrado.push({
                checked:"true",
                key:habilidad.key,
                titulo:habilidad.titulo
            })
           this.setState({habilidades:filtrado})
           
        }
        else{
            filtrado.push({
                checked:"",
                key:habilidad.key,
                titulo:habilidad.titulo
            })
            this.setState({habilidades:this.state.habilidades.filter(item=>item.key!=habilidad.key)})
        }
    }
    onChange(event,id){
        this.setState({[id]:event.target.value})
    }
    CrearPuesto(){
        let inputs =document.getElementsByClassName('requerid')
        let verificar=0
        for (let index = 0; index < inputs.length; index++) {
            if(inputs[index].value!=""){
                verificar=verificar+1
            }
        }
        if (verificar==inputs.length) {
            if (firebase.database().ref('puestos').push(this.state)) {
                this.notifyTopCenter('success','Perfil de puesto agregado correctamente')
                this.setState({
                    general:'',
                    diaria:'',
                    semanal:'',
                    quincenal:'',
                    mensual:'',
                    responsabilidaddiaria:'',
                    responsabilidades:[],
                    habilidades:[],
                    Puesto:'',
                    Departamento:'',
                    Organigrama:'',
                    Horario:'',
                    Proposito:'',
                    Directamente:'',
                    Edad:'',
                    Sexo:'',
                    Escolaridad:'',
                    Experiencia:'',
                    Manejo:'',
                    Oficina:'',
                    Otros:'',
                    Elaboro:'',
                    Reviso:'',
                    Autorizo:'',
                    Fecha:'',
                    empresa:this.props.usuario.empresa,
                    key:this.props.usuario.empresa.concat(Math.floor(Math.random() * (10000 - 1)) + 1)
                })
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
        <div className="row mt-4 mb-5">
            <ToastContainer />
            <div className="col-12">
                <div className="float-right">
                    <button onClick={()=>this.props.toggleView(0)} className="btn btn-general btn-block">Cancelar</button>
                </div>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Nombre del Puesto</label>
                <input type="text" className="form-control requerid" value={this.state.Puesto} onChange={(e)=>this.onChange(e,'Puesto')} id="Puesto" aria-describedby="emailHelp" placeholder="Nombre del Puesto"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Departamento</label>
                <input type="text" className="form-control requerid" value={this.state.Departamento} onChange={(e)=>this.onChange(e,'Departamento')} id="Departamento" aria-describedby="emailHelp" placeholder="Departamento"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Reporta en el organigrama a</label>
                <input type="text" className="form-control requerid" value={this.state.Organigrama} onChange={(e)=>this.onChange(e,'Organigrama')} id="organigrama" aria-describedby="emailHelp" placeholder="Reporta en el organigrama a"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label >Horario de trabajo</label>
                <input type="text" className="form-control requerid" value={this.state.Horario} onChange={(e)=>this.onChange(e,'Horario')} id="Horario" aria-describedby="emailHelp" placeholder="Reporta en el organigrama a"/>
            </div>
            <div className="col-12 col-xl-6 col-md-6 mt-2 requerid">
                <label>Propósito del puesto</label>
                <textarea className="form-control" rows="5" value={this.state.Proposito} onChange={(e)=>this.onChange(e,'Proposito')} id="Proposito"placeholder="Propósito del puesto"></textarea>
            </div>
            <div className="col-12 col-xl-6 col-md-6 mt-2">
                <label>Le reportan directamente</label>
                <input type="text" className="form-control requerid" value={this.state.Directamente} onChange={(e)=>this.onChange(e,'Directamente')} id="Directamente" aria-describedby="emailHelp" placeholder="Le reportan directamente"/>
            </div>
            <div className="col-12 text-center mt-4 border-bottom">
                <label className="title-dashboard">Responsabilidades</label>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label className="title-dashboard">Responsabilidades Generales</label>
                <div className="input-group mb-3">
                    <input type="email" value={this.state.general} onChange={(e)=>this.setState({general:e.target.value})} onFocus={()=>this.focusButton('agregarGeneral')} className="form-control input-responsabilidad" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarGeneral" onClick={()=>this.addResponsabilidad('general')} className="btn btn-outline-secondary btn-general remove " type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {this.state.responsabilidades.filter(item=>item.tipo=='general').map(responsabilidad=>
                        <button type="button" onClick={()=>this.removeResponsabilidad(responsabilidad.key)} key={responsabilidad.key} className="col-12 btn btn-block btn-light text-left mr-2 mb-2">
                         <span className="badge badge-light float-right">x</span> {responsabilidad.responsabilidad}
                        </button>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label className="title-dashboard">Responsabilidades Diaria</label>
                <div className="input-group mb-3">
                    <input type="email" value={this.state.diaria} onChange={(e)=>this.setState({diaria:e.target.value})} onFocus={()=>this.focusButton('agregardiaria')} className="form-control input-responsabilidad" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregardiaria" onClick={()=>this.addResponsabilidad('diaria')} className="btn btn-outline-secondary btn-general remove " type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {this.state.responsabilidades.filter(item=>item.tipo=='diaria').map(responsabilidad=>
                        <button type="button" onClick={()=>this.removeResponsabilidad(responsabilidad.key)} key={responsabilidad.key} className="col-12  text-left btn btn-block btn-light mr-2 mb-2">
                            <span className="badge badge-light float-right">x</span> {responsabilidad.responsabilidad}
                        </button>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label className="title-dashboard">Responsabilidades Semanales</label>
                <div className="input-group mb-3">
                    <input type="email" value={this.state.semanal} onChange={(e)=>this.setState({semanal:e.target.value})} onFocus={()=>this.focusButton('agregarsemanal')} className="form-control input-responsabilidad" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarsemanal" onClick={()=>this.addResponsabilidad('semanal')} className="btn btn-outline-secondary btn-general remove " type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {this.state.responsabilidades.filter(item=>item.tipo=='semanal').map(responsabilidad=>
                        <button type="button" onClick={()=>this.removeResponsabilidad(responsabilidad.key)} key={responsabilidad.key} className="col-12  text-left btn btn-block btn-light mr-2 mb-2">
                            <span className="badge badge-light float-right">x</span> {responsabilidad.responsabilidad}
                        </button>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label className="title-dashboard">Responsabilidades Quincenal</label>
                <div className="input-group mb-3">
                    <input type="email" value={this.state.quincenal} onChange={(e)=>this.setState({quincenal:e.target.value})} onFocus={()=>this.focusButton('agregarquincenal')} className="form-control input-responsabilidad" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarquincenal" onClick={()=>this.addResponsabilidad('quincenal')} className="btn btn-outline-secondary btn-general remove " type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {this.state.responsabilidades.filter(item=>item.tipo=='quincenal').map(responsabilidad=>
                        <button type="button" onClick={()=>this.removeResponsabilidad(responsabilidad.key)} key={responsabilidad.key} className="col-12  text-left btn btn-block btn-light mr-2 mb-2">
                            <span className="badge badge-light float-right">x</span> {responsabilidad.responsabilidad}
                        </button>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label  className="title-dashboard">Responsabilidades Mensual</label>
                <div className="input-group mb-3">
                    <input type="email" value={this.state.mensual} onChange={(e)=>this.setState({mensual:e.target.value})} onFocus={()=>this.focusButton('agregarmensual')} className="form-control input-responsabilidad" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarmensual" onClick={()=>this.addResponsabilidad('mensual')} className="btn btn-outline-secondary btn-general remove " type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {this.state.responsabilidades.filter(item=>item.tipo=='mensual').map(responsabilidad=>
                        <button type="button" onClick={()=>this.removeResponsabilidad(responsabilidad.key)} key={responsabilidad.key} className="col-12  text-left btn btn-block btn-light mr-2 mb-2">
                            <span className="badge badge-light float-right">x</span> {responsabilidad.responsabilidad}
                        </button>  
                    )}
                </div>
            </div>
            <div className="col-12 text-center mt-4 border-bottom">
                <label className="title-dashboard">Requerimientos del puesto / Experiencia laboral</label>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Edad</label>
                <input type="text" className="form-control requerid" value={this.state.Edad} onChange={(e)=>this.onChange(e,'Edad')} id="Edad" aria-describedby="emailHelp" placeholder="Edad"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label >Sexo</label>
                <input type="text" className="form-control requerid" value={this.state.Sexo} onChange={(e)=>this.onChange(e,'Sexo')} id="Sexo" aria-describedby="emailHelp" placeholder="Sexo"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Escolaridad</label>
                <input type="text" className="form-control requerid" value={this.state.Escolaridad} onChange={(e)=>this.onChange(e,'Escolaridad')} id="Escolaridad" aria-describedby="emailHelp" placeholder="Escolaridad"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label >Experiencia</label>
                <input type="text" className="form-control requerid" value={this.state.Experiencia} onChange={(e)=>this.onChange(e,'Experiencia')} id="Experiencia" aria-describedby="emailHelp" placeholder="Experiencia"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Manejo de Software</label>
                <input type="text" className="form-control requerid" value={this.state.Manejo} onChange={(e)=>this.onChange(e,'Manejo')} id="Manejo" aria-describedby="emailHelp" placeholder="Manejo"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Manejo de equipo oficina</label>
                <input type="text" className="form-control requerid" value={this.state.Oficina} onChange={(e)=>this.onChange(e,'Oficina')} id="Oficina" aria-describedby="emailHelp" placeholder="oficina"/>
            </div>

            <div className="col-12 col-xl-6 col-md-4 mt-2">
                <label>Otros</label>
                <input type="text" className="form-control" value={this.state.Otros} onChange={(e)=>this.onChange(e,'Otros')} id="Otros" aria-describedby="emailHelp" placeholder="Otros"/>
            </div>
            <div className="col-12 text-center mt-4 border-bottom">
                <label className="title-dashboard">Habilidades y actitudes</label>
            </div>
            {this.props.habilidades.map(habilidad=>
                <div className="col-12 col-xl-6 col-md-4 mt-2" key={habilidad.titulo}>
                    <div className="form-check">
                        <input onChange={(e)=>this.check(habilidad)} id={habilidad.key} className="form-check-input" type="checkbox" name={habilidad.key} />
                        <label className="form-check-label">
                            {habilidad.titulo}
                        </label>
                    </div>
                </div>
            )}
            <div className="col-12 text-center mt-4 border-bottom">
                <label className="title-dashboard">Responsables de documentar la descripción de puesto</label>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Elaboró</label>
                <input type="text" className="form-control requerid" value={this.state.Elaboro} onChange={(e)=>this.onChange(e,'Elaboro')} id="Elaboro" aria-describedby="emailHelp" placeholder="Elaboró"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Revisó</label>
                <input type="text" className="form-control requerid" value={this.state.Reviso} onChange={(e)=>this.onChange(e,'Reviso')} id="Reviso" aria-describedby="emailHelp" placeholder="Revisó"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Autorizó</label>
                <input type="text" className="form-control requerid" value={this.state.Autorizo} onChange={(e)=>this.onChange(e,'Autorizo')} id="Autorizo" aria-describedby="emailHelp" placeholder="Autorizó"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Fecha</label>
                <input type="text" className="form-control requerid" value={this.state.Fecha} onChange={(e)=>this.onChange(e,'Fecha')} id="Fecha" aria-describedby="emailHelp" placeholder="Fecha"/>
            </div>
            <div className="col-12 mt-4">
                <button className="btn btn-general btn-block" onClick={()=>this.CrearPuesto()}>Crear Puesto</button>
            </div>
        </div>
        )
    }
}
const mapStateProps = state =>({
    habilidades:state.habilidades,
    usuario:state.info,
    puestos:state.puestos,
})

export default connect(mapStateProps,null)(nuevoperfil)
