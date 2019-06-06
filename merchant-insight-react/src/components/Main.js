import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {Home} from "./Home";
import {Login} from "../authentication/Login";
import {Register} from "../authentication/Register";
import {Welcome} from "./Welcome";
import {Dashboard} from "./Dashboard";
import {Layout} from 'antd'
import "../styles/Main.css";
const { Content } = Layout;

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? (
            <Redirect to="/home"/>
        ) : (
            <Login handleLogin={this.props.handleLogin}/>
        );
    };

    getHome = () => {
        return this.props.isLoggedIn ? <Dashboard/> : <Welcome/>;
    };

    getRoot = () => {
        return <Redirect to="/login"/>;
    };

    getGeneral = () => {
        return this.props.isLoggedIn ? <Home/> : <Welcome/>;
    };

    render() {
        return (
            <Content>
                <div className="mainPage">
                    <Switch>
                        <Route exact path="/" render={this.getHome}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" render={this.getLogin}/>
                        <Route path="/home" render={this.getHome}/>
                        <Route path="/general" render={this.getGeneral}/>
                        <Route render={this.getRoot}/>
                    </Switch>

                </div>
            </Content>
        )
            ;
    }
}
