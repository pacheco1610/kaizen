import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './modal.css'



export default class modal extends Component {
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
            <div className='Modal'>
                <div className="container Modal__container">
                <div className="d-flex ml-auto">
                        <button className="btn btn-close ml-auto" onClick={()=>this.CloseModal()}>x</button>
                    </div>
                        {this.props.children}
                </div>
                
            </div>,
                document.getElementById('modal'))
            )
        }  
    } 
}
