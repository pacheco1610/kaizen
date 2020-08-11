import React, { Component } from 'react'
import {connect} from 'react-redux'

class tabcolaboradores extends Component {
    estatus(key){
        switch (key) {
            case 'true':
            return(<td><span className="badge badge-pill badge-success">Activo</span></td>)
            case 'false':
            return(<td><span className="badge badge-pill badge-light">Pendiente...</span></td>)
        
            default:
                break;
        }
    }
    toggleRight=(provid,render,colaborador)=>{
        this.props.toggleRight(provid,render)
        this.props.InfoColaborador(colaborador)
    }
    render() {
        return (
            <div className="table-scroll-y my-custom-scrollbar">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Estatus</th>
                                <th scope="col">Puesto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.colaboradores.map(colaborador=>
                                <tr key={colaborador.referencia} onClick={()=>this.toggleRight('Informacion del colaborador',3,colaborador)}>
                                    <td><img src={colaborador.photoURL} className="img-fluid rounded-circle img-thumbnail img_perfil" alt=""/> {colaborador.displayname}</td>
                                    {this.estatus(colaborador.estatus)}
                                    <td>{colaborador.puesto.Puesto}</td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
        )
    }
}

const mapStateProps = state =>({
    colaboradores:state.colaboradores
})
const mapDispatchToprops = dispatch =>({
    UpdateClienteInfo(cliente){
      dispatch({
        type:'infocliente',
        cliente
      })
    },
    InfoColaborador(infoColaborador){
        dispatch({
          type:'InfoColaborador',
          infoColaborador
        })
      },
})

export default connect(mapStateProps,mapDispatchToprops)(tabcolaboradores)