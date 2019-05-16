import React from 'react';
import { Main } from './Main';
import { Header } from './Header';
import { TOKEN_KEY } from '../res/Constants';
import { withRouter } from 'react-router';
import { Col } from 'react-bootstrap'
import '../styles/App.css';

class App extends React.Component {
    state = {
        isLoggedIn : !!localStorage.getItem(TOKEN_KEY),
    }

    handleLogin = (response) => {
        localStorage.setItem(TOKEN_KEY,response)
        this.setState({ isLoggedIn: true })
    }

    handleLogOut = () => {
        localStorage.removeItem(TOKEN_KEY)
        this.setState({ isLoggedIn: false })
    }

    render() {
        return (
            <div className='App'>
                <Col lg={12}  md={12} sm={12} xs={12} className="header-wrapper">
                <Header history={this.props.history} isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut}/>
                </Col>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>

        )
    }
}
export default withRouter(App);