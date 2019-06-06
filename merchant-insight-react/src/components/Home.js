import React from "react";
import { GeneralGraph } from "../generalGraphs/GeneralGraph";
import { Row, Col } from "react-bootstrap";
import { Assistant } from "./Assistant";
import "../styles/Home.css";

export class Home extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="home-page">
        <Col className="Ling-Ling" lg={4} md={10} sm={10} xs={10}>
              <Assistant
                text={"Your general graphs are here."}
              />
        </Col>

        
        <Row className="home-first-row">
          <Col lg={7}>
            <GeneralGraph history={this.props.history}/>
          </Col>
        </Row>
      </div>
    );
  }
}
