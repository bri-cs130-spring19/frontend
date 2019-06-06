import React from "react";
import {Main} from "./Main";
import { AppHeader } from "./Header"
import {TOKEN_KEY} from "../res/Constants";
import {withRouter} from "react-router";
import {NavBar} from './NavBar';
import { Layout } from 'antd';
import "../styles/App.css";


class App extends React.Component {
    state = {
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY)
    };


    componentDidMount() {
        console.log(window.innerHeight)
    }

    handleLogin = response => {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        this.setState({
            isLoggedIn: true
        });
    };

    handleLogOut = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({
            isLoggedIn: false
        });
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="App" style={{ minHeight: "100vh" }}>
                <Layout>
                    <AppHeader history={this.props.history} isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut} />
                    <Layout style={{minHeight:"100vh"}}>
                        {
                            this.state.isLoggedIn ?
                                <NavBar history={this.props.history} isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut}/>
                                : null
                        }

                        <Layout>
                            <Main history={this.props.history} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
                        </Layout>
                    </Layout>
                </Layout>,
            </div>
        );
    }
}

export default withRouter(App);
