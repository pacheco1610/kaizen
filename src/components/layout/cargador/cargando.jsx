import React, { Component } from 'react'

export default class cargando extends Component {
    render() {
        return (
            <div className="contenedor vh-100">
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}
