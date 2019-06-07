import React from "react";
import { Map } from "../dashboard/Map";
import { Assistant } from "./Assistant";
import { Sidebar } from "../dashboard/Sidebar";
import { Row, Col } from "react-bootstrap";
import {BACKEND_API, US_STATES, US_STATES_STATE_CODES} from "../res/Constants";
import axios from "axios";

import "../styles/Dashboard.css";

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      curState: undefined,
      data: undefined
    };
  }

  handleOnClick = data => {
    this.setState({ curState: data, data: undefined});

        const urls = [US_STATES_STATE_CODES[US_STATES.indexOf(data.id)]].map( e => BACKEND_API+'/data/states/'+e+'?startMonth=12&startYear=2018&endMonth=5&endYear=2019');
        const promises = urls.map( url => axios.get(url));
        let result = [];
        axios.all(promises)
            .then((responses) => {
                for (let i = 0; i < 1; i++) {
                    var female = {};
                    var male = {};
                    var months = [];
                    female.name = "female";
                    male.name = "male";
                    female.value = responses[i].data.numberFemales;
                    male.value = responses[i].data.numberMales;
                    months = responses[i].data.averageOverallSatisfactionByMonth;
                    result.push([female, male, months]);

                }
                this.setState({curState: data, data: result});

            })
            .catch((error) => {
                console.log(error)
            })
  };

  render() {
    return (
      <div className="dashboard">
        <Row className="test">
          <Col lg={8} md={12} sm={12} xs={12}>
            <Map handleOnClick={this.handleOnClick} className="DashboardMap" />
          </Col>
          {this.state.curState !== undefined ? (
            <Col className="Ling-Ling" lg={4} md={12} sm={12} xs={12}>
              <Sidebar curState={this.state.curState} data={this.state.data} />
            </Col>
          ) : (
            <Col className="Ling-Ling" lg={4} md={12} sm={12} xs={12}>
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
