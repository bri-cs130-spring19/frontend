import React from 'react'
import { Map } from '../map/Map'


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


    render(data) {
        return (
            <div className='test'>
                <Map handleUserInteraction={this.handleUserInteraction} handleOnClick={this.handleOnClick} />
                {
                    this.state.userClicked ? <p>{this.state.curState.id}</p> : null
                }
            </div>
        )
    }


}