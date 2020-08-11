import React, { Component } from 'react'

import Menu from '../menu/menu'

export default class sidebar extends Component {
    render() {
        return (
            <div className="border-right" id="sidebar-wrapper">
                <div className="sidebar-heading text-center text-white ">
                    <div className="container rounded mt-2 title-app">KaizenApp</div>
                 </div>
                <div className="list-group list-group-flush">
                    <Menu/>
                </div>
            </div>
        )
    }
}
