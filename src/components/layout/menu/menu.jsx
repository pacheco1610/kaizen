import React, { Component } from 'react'
import {connect} from 'react-redux'

class menu extends Component {
    componentDidMount(){
        let elements = document.getElementsByClassName('col-12')
        if (elements[0]>=0) {
            elements[0].classList.add('activo')
        }
        
    }
    handleMenu(key){
        this.props.UpdateMenu(key)
        let elements = document.getElementsByClassName('col-12')
        for (let index = 0; index < elements.length; index++) {
            elements[index].classList.remove('activo')
            
        }
        document.getElementById(key).classList.toggle('activo')
    }
    render() {
        return (
            <React.Fragment>
                {this.props.menu.map(button=>
                    <button className="text-left list-group-item col-12 button-sidebar" id={button.key} key={button.key} onClick={()=>this.handleMenu(button.key)} ><i className={`mr-1 ${button.icono}`}></i> {button.titulo}</button>
                    )} 
            </React.Fragment>
        )
    }
}
const mapStateProps = state =>({
    menu:state.menu,
    menuview: state.menuview
})
const mapDispatchToprops = dispatch =>({
    UpdateMenu(render){
      dispatch({
        type:'CAMBIAR_MENU',
        render
      })
    },
})
export default connect(mapStateProps,mapDispatchToprops)(menu);
