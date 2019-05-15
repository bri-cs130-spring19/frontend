import React from 'react';
import { Main } from './Main';
import { Header } from './Header'
import { TOKEN_KEY } from '../res/Constants'
import { withRouter } from 'react-router'
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
                <Header history={this.props.history} isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>

        )
    }
}
export default withRouter(App);