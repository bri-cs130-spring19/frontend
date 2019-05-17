import React from 'react';
import { GeneralGraph } from '../generalGraphs/GeneralGraph'
import { Row, Col } from 'react-bootstrap'
import '../styles/Home.css'

export class Home extends React.Component {
    render() {
        return (
            <div className='home-page'>
                <Row className='home-first-row'>
                    <Col lg={12}>
                        <GeneralGraph/>
                    </Col>
                </Row>
            </div>
        )
    }
}