import React from 'react';
import {Col, Row} from "react-bootstrap"
import {GeneralGraph} from "../generalGraphs/GeneralGraph"
import '../styles/General.css'
export class General extends React.Component {
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