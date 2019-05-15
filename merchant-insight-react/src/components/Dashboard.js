import React from 'react'
import { Map } from '../map/Map'
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
                <Map handleUserInteraction={this.handleUserInteraction} handleOnClick={this.handleOnClick} />
                {
                    this.state.userClicked ? <p className="state-text">{this.state.curState.id}</p> : null
                }
            </div>
        )
    }


}