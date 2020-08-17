import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {Provider} from 'react-redux'
import store from './store/store'


import Dashboard from "./components/layout/Dashboard";
import Tareas from './components/layout/secciones/tareas/tareas'
import Clientes from './components/layout/secciones/clientes/clientes'
import Colaboradores from './components/layout/secciones/colaboradores/colaboradores'
import Puestos from './components/layout/secciones/perfilDePuestos/perfil'
import AuthContext  from "./context/AuthContext";
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AuthContext>
                        <Router>
                            <Switch>
                                <Dashboard>
                                    <Route exact path="/">
                                        <Tareas/>
                                    </Route>
                                    <Route exact path="/clientes">
                                        <Clientes/>
                                    </Route>
                                    <Route exact path="/colaboradores">
                                        <Colaboradores/>
                                    </Route>
                                    <Route exact path="/perfildepuestos">
                                        <Puestos/>
                                    </Route>

                                </Dashboard>
                            </Switch>
                        </Router>
                </AuthContext>
            </Provider>
        )
    }
}
