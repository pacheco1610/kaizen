import React, { Component } from 'react'
import {connect} from 'react-redux'


import Bienvenida from './bienvenida'
import Empresa from './empresa'
import Colaboradro from './colaborador'

class bienvenido extends Component {
    constructor(props){
        super(props)
        this.state={
            renderView:0
        }
    }
    toggledView=(view)=>{
        this.setState({renderView:view})
    }
    renderView(){
        switch (this.state.renderView) {
            case 0:
                return(<Bienvenida toggledView={this.toggledView}/>)
            case 1:
                return(<Empresa toggledView={this.toggledView}/>)
            case 2:
                return(<Colaboradro toggledView={this.toggledView}/>)
            default:
                break;
        }
    }
    render() {
        return (
            <React.Fragment>
             {this.renderView()}
            </React.Fragment>
        )
    }
}
const mapDispatchToprops = dispatch =>({
    UpdateUsuario(usuario){
      dispatch({
        type:'usuario',
        usuario
      })
    },
})

export default connect(null,mapDispatchToprops)(bienvenido);
