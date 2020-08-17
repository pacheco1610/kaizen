import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class menu extends Component {

    render() {
        return (
            <React.Fragment>
                {this.props.menu.map(button=>
                    <Link to={button.direccion} id={button.key} key={button.key} className="text-left list-group-item col-12 button-sidebar"><i className={`mr-1 ${button.icono}`}></i> {button.titulo}</Link>
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
})
export default connect(mapStateProps,mapDispatchToprops)(menu);
