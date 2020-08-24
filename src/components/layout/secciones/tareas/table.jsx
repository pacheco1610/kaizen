import React, { Component } from 'react'
import moment from "moment";

export default class table extends Component {
    render() {

        return (
            <table class="table">
                <tbody>
                {this.props.tareas.map(tarea=>
                    <tr className="btn-row-check">
                        <th >{tarea.titulo}</th>
                        <th >{tarea.responsables.map(responsable=>{
                                return(<span>{responsable.displayname}, </span>)
                            })}
                        </th>
                        <th>{moment(tarea.fecha).format('DD/MM/YYYY')}</th>
                </tr>
                )
                }
                </tbody>
            </table>
        )
    }
}
