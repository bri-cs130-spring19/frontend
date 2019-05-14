import React from 'react';
import { Header } from './Header'
import { Map } from './map/Map'
import './styles/Main.css'


export class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Header/>
                <Map />
            </div>
        );
    }
}
