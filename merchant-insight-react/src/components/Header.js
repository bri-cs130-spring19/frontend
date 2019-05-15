import React from 'react';
import logo from '../res/logo.svg';
import { Icon, Menu, Dropdown} from 'antd';
import PropTypes from 'prop-types';


const DropdownButton = Dropdown.Button;

export class Header extends React.Component {
    static propTypes = {
        isLoggedIn : PropTypes.bool.isRequired,
        handleLogOut: PropTypes.func.isRequired,
    }

    redirectToLogin = () => {
        this.props.history.push('/login')
    }

    redirectToHome = () => {
        this.props.history.push('/home')
    }

    redirectToDashBoard = () => {
        this.props.history.push('/dashboard')
        this.forceUpdate()
    }

    render() {
        const guestMenu = (
            <Menu>
                <Menu.Item key="1" onClick={this.redirectToLogin}>
                    <Icon type="user" />
                    Log in or Register
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="user" />
                    Contact us
                </Menu.Item>
            </Menu>
        );

        const menu = (
            <Menu>
                <Menu.Item key="1" onClick={this.redirectToDashBoard}>
                    <Icon type="user" />
                    Dashboard
                </Menu.Item>
                <Menu.Item key="2" >
                    <Icon type="user" />
                    Need Help?
                </Menu.Item>
                <Menu.Item key="3" onClick={this.props.handleLogOut}>
                    <Icon type="user"/>
                    Log out
                </Menu.Item>
            </Menu>
        );

        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <h1 className="App-title">  Merchant Insight</h1>
                {
                    this.props.isLoggedIn ?
                        <DropdownButton className='dropdown' overlay={menu} icon={<Icon type="user" />} type='link' onClick={this.redirectToHome} >
                            User Profile
                        </DropdownButton>
                         : <DropdownButton className='dropdown' overlay={guestMenu} icon={<Icon type="menu"/>} type='link' onClick={this.redirectToHome} >
                            Home
                        </DropdownButton>
                }
            </header>
        );
    }
}
