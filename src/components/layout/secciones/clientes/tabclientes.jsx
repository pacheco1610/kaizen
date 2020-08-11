import React, { Component } from 'react'
import {connect} from 'react-redux'

class tabclientes extends Component {
    constructor(props){
        super(props)
        this.state={
            clientes:this.props.clientes.filter(item => item.info.tcliente==this.props.tc)
        }
    }
    toggleRight=(provid,render,cliente)=>{
        this.props.toggleRight(provid,render)
        this.props.UpdateClienteInfo(cliente)
    }
    componentDidUpdate(prevprop){
        if (this.props.clientes != prevprop.clientes) {
            this.setState({clientes:this.props.clientes.filter(item => item.info.tcliente==this.props.tc)})
        }
    }
    render() {
        if (this.state.clientes.length>=1) {
            return (
                <div className="table-scroll-y my-custom-scrollbar">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Empresa</th>
                                <th scope="col">Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clientes.map(cliente=>
                                <tr key={cliente.info.email} onClick={()=>this.toggleRight('Informacion del cliente',1,cliente)}>
                                    <td>{cliente.info.nombre+' '+cliente.info.apellido}</td>
                                    <td>{cliente.info.empresa}</td>
                                    <td>{cliente.info.telefono}</td>
                                </tr>
                                )}
                        
    
                        </tbody>
                    </table>
                </div>
                
            )
        }
        else{
            return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Empresa</th>
                        <th scope="col">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sin clientes registrados, Agrega nuevos clientes a tu lista</td>
                    </tr>
                </tbody>
            </table>
            )
        }
        
    }
}

const mapStateProps = state =>({
    clientes:state.clientes
})
const mapDispatchToprops = dispatch =>({
    UpdateClienteInfo(cliente){
      dispatch({
        type:'infocliente',
        cliente
      })
    },
})
export default connect(mapStateProps,mapDispatchToprops)(tabclientes);