import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { General} from './General';
import { Login } from '../authentication/Login';
import { Register } from '../authentication/Register'
import { Welcome } from './Welcome'
import { Dashboard} from "./Dashboard"
import '../styles/Main.css'



export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to='/home'/> : <Login handleLogin={this.props.handleLogin} />
    }

    getDashboard = () => {
        return this.props.isLoggedIn ? <Dashboard/> : <Welcome/>
    }

    getRoot = () => {
        return <Redirect to='/login'/>
    }

    getGeneral = () => {
        return this.props.isLoggedIn ? <General/> : <Welcome/>
    }

    render() {
        return (
            <div className='mainPage'>
                <Switch>
                    <Route exact path='/' render={this.getDashboard}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' render={this.getLogin}/>
                    <Route path='/home' render={this.getDashboard}/>
                    <Route path='/general' render={this.getGeneral}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        )
    };

}
