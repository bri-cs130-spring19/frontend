import React from 'react'
import {Layout, Menu, Drawer, Icon, Button, Affix} from 'antd';
import '../styles/NavBar.css'
import PropTypes from "prop-types"

const { Sider } = Layout;

const Item = Menu.Item;

export class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            isBigScreen: true,
            visible: false,
            top: 12,
        }
    }

    static propTypes = {
        isLoggedIn : PropTypes.bool.isRequired,
        handleLogOut: PropTypes.func.isRequired,
    }


    redirectToDashBoard = () => {
        this.props.history.push('/dashboard')
        this.forceUpdate()
    }
    redirectToGeneral = () => {
        this.props.history.push('/general')
        this.forceUpdate()
    }

    componentDidMount() {
        this.siderOrDrawer();
        window.addEventListener("resize", this.siderOrDrawer.bind(this));
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    siderOrDrawer() {
        if (window.innerWidth < 992) {
            this.setState({isBigScreen: false});
        } else {
            this.setState({isBigScreen: true});
        }
    }
    
    showDrawer = () => {
        if (this.state.visible) {
            this.setState({ visible: false})
        }
        this.setState({ visible: true})
    }
    
    onClose = () => {
        this.setState({ visible: false })
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.siderOrDrawer.bind(this));
    }

    render() {
        return (
            this.state.isBigScreen ?
                    <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="inline">
                            <Item key="1">
                                <Icon type="pie-chart"/>
                                <span>What's New</span>
                            </Item>
                            <Item key="2" onClick={this.redirectToDashBoard}>
                                <Icon type="desktop"/>
                                <span>Geo Dashboard</span>
                            </Item>
                            <Item key="3" onClick={this.redirectToGeneral}>
                                <Icon type="desktop"/>
                                <span>General graph</span>
                            </Item>
                        </Menu>
                    </Sider>
                :
                <div>
                    <Affix offsetTop={120}  style={{ width: 0}}>
                        <Button onClick={this.showDrawer} style={{ marginBottom: 16 }}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                    </Affix>
                    <Drawer title="Menu" placement="left" closable={false}
                            onClose={this.onClose} visible={this.state.visible}>
                        <Menu theme="light" mode="inline">
                            <Item key="1">
                                <Icon type="pie-chart"/>
                                <span>What's New</span>
                            </Item>
                            <Item key="2" onClick={this.redirectToDashBoard}>
                                <Icon type="desktop"/>
                                <span>Geo Dashboard</span>
                            </Item>
                            <Item key="3" onClick={this.redirectToGeneral}>
                                <Icon type="desktop"/>
                                <span>General graph</span>
                            </Item>
                        </Menu>
                    </Drawer>
                </div>



        );
    }
}



