import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Login } from '../authentication/Login';
import { Register } from '../authentication/Register'
import { Welcome } from './Welcome'
import { Dashboard } from './Dashboard'

import '../styles/Main.css'



export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to='/home'/> : <Login handleLogin={this.props.handleLogin} />
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Welcome/>
    }

    getRoot = () => {
        return <Redirect to='/login'/>
    }

    getDashBoard = () => {
        return this.props.isLoggedIn ? <Dashboard/> : <Welcome/>
    }

    render() {
        return (
            <div className='mainPage'>
                <Switch>
                    <Route exact path='/' render={this.getHome}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' render={this.getLogin}/>
                    <Route path='/home' render={this.getHome}/>
                    <Route path='/dashboard' render={this.getDashBoard}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        )
    };

}
