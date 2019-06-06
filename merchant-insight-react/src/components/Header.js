import React from 'react';
import { Layout, Icon} from 'antd';
import PropTypes from 'prop-types';


const { Header } = Layout;

export class AppHeader extends React.Component {
    static propTypes = {
        isLoggedIn : PropTypes.bool.isRequired,
        handleLogOut: PropTypes.func.isRequired,
    }

    redirectToLogin = () => {
        this.props.history.push('/login')
    }


    render() {
        return (
            <Header className="header">Merchant Insight
                {
                    this.props.isLoggedIn ?
                        <a className="logout"
                           onClick={this.props.handleLogOut}
                        >
                            <Icon type="logout" />
                        </a>
                        :
                        <a className="login"
                                   onClick={this.redirectToLogin}
                        >
                            <Icon type="user" />
                        </a>


                }
            </Header>
        );
    }
}
