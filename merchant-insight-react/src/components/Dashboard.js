import React from "react";
import { Map } from "../dashboard/Map";
import { Assistant } from "./Assistant";
import { Sidebar } from "../dashboard/Sidebar";
import { Row, Col } from "react-bootstrap";

import "../styles/Dashboard.css";

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      curState: undefined
    };
  }

  handleOnClick = data => {
    this.setState({ curState: data });
  };

  render() {
    return (
      <div className="dashboard">
        <Row className="test">
          <Col lg={8} md={10} sm={10} xs={10}>
            <Map handleOnClick={this.handleOnClick} className="DashboardMap" />
          </Col>
          {this.state.curState !== undefined ? (
            <Col className="Ling-Ling" lg={4} md={10} sm={10} xs={10}>
              <Sidebar curState={this.state.curState} />
            </Col>
          ) : (
            <Col className="Ling-Ling" lg={4} md={10} sm={10} xs={10}>
              <Assistant
                text={"Click on any state to see more detailed information."}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}
