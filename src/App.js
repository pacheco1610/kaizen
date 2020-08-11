import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {Provider} from 'react-redux'
import store from './store/store'


import Dashboard from "./components/layout/Dashboard";
import Login from './components/layout/login/login'
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
                                <Route exact path="/">
                                    <Dashboard />
                                </Route>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                            </Switch>
                        </Router>
                </AuthContext>
            </Provider>
        )
    }
}
