import React from 'react'
import { Map } from '../map/Map'
import { Comment, Avatar } from 'antd';
import '../styles/Dashboard.css'

export class Dashboard extends React.Component {
    state = {
        userClicked: false,
        curState: null,
    }

    handleUserInteraction = () => {
        this.setState({ userClicked: true } )
    }

    handleOnClick = (data) => {
        this.setState({curState: data})
    }


    render() {
        return (
            <div className='test'>
                <Map handleUserInteraction={this.handleUserInteraction} handleOnClick={this.handleOnClick} className='DashboardMap' />
                {
                    this.state.userClicked ?
                        <Comment className="Ling-Ling"
                            author={<a>Ling Ling</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={'Your statistics for ' + this.state.curState.id + ' is here.'}

                        />
                        : null
                }
            </div>
        )
    }


}