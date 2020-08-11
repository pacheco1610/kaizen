import React, { Component, Fragment } from 'react'
import Tabusuarios from '../usuarios/tabusuarios'
import Tclientes from '../clientes/tabclientes'
export default class clientes extends Component {
    constructor(props){
        super(props)
        this.state={
            usuario:this.props.usuario
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({usuario:nextProps.usuario})
    }
    render() {
        return (
            <section>
                <div class="container-fluid pl-5 pr-5 pt-3">
                    <div class="row">
                        <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div className="row pt-md-5 mt-md-3  mb-4">
                                <h3>Usuarios</h3>
                            </div>
                            <div class="row mb-5">
                                <div className="col-12 col-md-12 col-lg-12"><Tabusuarios usuario={this.state.usuario}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
