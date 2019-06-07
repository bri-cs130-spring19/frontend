import React from "react";
import { GeneralGraph } from "../generalGraphs/GeneralGraph";
import { Row, Col } from "react-bootstrap";
import { Layout } from 'antd';
import { Assistant } from "./Assistant";
import "../styles/Home.css";

export class Home extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="home-page">
          <Row>
            <Col className="Ling-Ling" lg={4} md={12} sm={12} xs={12}>
              <Assistant
                text={"Your general graphs are here."}
              />
            </Col>
          </Row>

        <Row className="home-first-row">
          <Col lg={12} md={12} sm={12} xs={12}>
            <GeneralGraph history={this.props.history}/>
          </Col>
        </Row>
      </div>
    );
  }
}
