import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './modal.css'
import {connect} from 'react-redux'

import Menu from '../layout/menu/menu'

class modal extends Component {
    constructor (props) {
        super(props)
    }
    CloseModal(){
        this.props.isClose()
    }
    render() {
        if (!this.props.isOpen) {
            return null;
        }
        
        else{
            return (ReactDOM.createPortal(
            <div className="Modal-Menu">
                <div className="container Modal__container">
                    <div className="d-flex ml-auto">
                        <button className="btn btn-close ml-auto" onClick={()=>this.CloseModal()}>x</button>
                    </div>
                    <div className="row">
                        <div className="container">
                           <Menu/>
                        </div>
                    </div>
                </div>
            </div>,
                document.getElementById('modal'))
            )
        }  
    } 
}
const mapDispatchToprops = dispatch =>({
    CambiarMenu(menuRender){
      dispatch({
        type:'CAMBIAR_MENU',
        menuRender
      })
    }
})
export default connect(null,mapDispatchToprops)(modal);
