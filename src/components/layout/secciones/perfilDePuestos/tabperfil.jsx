import React, { Component } from 'react'
import {connect} from 'react-redux'

class tabperfil extends Component {
    InfoPuesto(puesto,render){
        this.props.InfoPuesto(puesto)
        this.props.toggleView(render)
    }
    renderTable(){
        if (this.props.puestos.length>0) {
            return(
                this.props.puestos.map(puesto=>
                    <tr key={puesto.key} onClick={()=>this.InfoPuesto(puesto,2)}>
                        <td> {puesto.Puesto}</td>
                        <td>{puesto.Proposito}</td>
                    </tr>
                    )
            )
        }
        else{
            return(
                <tr>
                    <td>Agrega un Puesto a tu empresa</td>
                </tr>
            )
        }
    }
    render() {
        return (
            <div className="row mt-4 tab-clientes">
                <div className="table-scroll-y my-custom-scrollbar">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Puesto</th>
                                <th scope="col">Proposito</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </table>
                </div>
            </div> 
        )
    }
}
const mapStateProps = state =>({
    puestos:state.puestos,
})
const mapDispatchToprops = dispatch =>({
    InfoPuesto(InfoPuesto){
        dispatch({
          type:'InfoPuesto',
          InfoPuesto
        })
      },
})
export default connect(mapStateProps,mapDispatchToprops)(tabperfil)
