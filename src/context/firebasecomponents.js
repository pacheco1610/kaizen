import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'

class firebasecomponents extends Component {
    constructor(props){
        super(props)
        this.state={
            clientes:[]
        }
    }
    componentDidMount(){
        console.log(this.props.clientes)
       if (this.props.info!="") {
      
       }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
const mapStateProps = state =>({
    info: state.info,
    clientes: state.clientes,
})

const mapDispatchToprops = dispatch =>({
    UpdateInfo(info){
        dispatch({
          type:'info',
          info
        })
      },
    UpdateClientes(clientes){
        dispatch({
          type:'clientes',
          clientes
        })
      },
})
export default connect(mapStateProps,mapDispatchToprops)(firebasecomponents)