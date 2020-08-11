import React, { Component } from 'react'

export default class sidebarRight extends Component {
    
    render() {
        return (
            <div id="sidebar-right">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="container bg-white rounded shadow mt-2 p-4">
                                <nav className="navbar navbar-expand-lg">
                                    <h4 className="title-dashboard">{this.props.titulo}</h4>
                                    <ul className="navbar-nav ml-auto">
                                        <button onClick={()=>this.props.toggleClose()} className="nav-item btn"><h4 className="title-dashboard">X</h4></button>
                                    </ul>
                                </nav>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                               {this.props.children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}
