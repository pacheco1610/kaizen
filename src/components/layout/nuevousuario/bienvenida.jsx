import React, { Component } from 'react'
import firebase from '../../../firebaseConfig'
export default class bienvenida extends Component {
    toggledView=(view)=>{
        this.props.toggledView(view)
    }
    render() {
        return (
            <div className='wrapper-bienvenida'>
                <div className="container container-bienvenida">
                    <h1>Bienvenido</h1>
                    <span>Veo que no estas registrado, para continuar con la experiencia en kaizen, realiza tu registro</span>
                    <h1 className="title-dashboard">¿Como deseas continuar?</h1>
                    <div className="row justify-content-center mt-2">
                        <button className="btn btn-general btn-block col-xl-4 col-md-6" onClick={()=>this.toggledView(1)}>Empresa</button>
                    </div>
                    <div className="row justify-content-center mt-2">
                        <button className="btn btn-general btn-block col-xl-4 col-md-6"  onClick={()=>this.toggledView(2)}>Colaborador</button>
                    </div>
                    <div className="d-flex mr-auto mt-2">
                        <button className="btn btn-general ml-auto" onClick={()=>firebase.auth().signOut()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}
