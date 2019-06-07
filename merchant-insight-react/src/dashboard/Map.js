import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import chroma from "chroma-js";
import { scaleLinear } from "d3-scale";
import geoData from "../res/us7.json";
import "../styles/Map.css";
import { Spin } from 'antd';
import { Button, Row, Col } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import {BACKEND_API, US_STATES, US_STATES_STATE_CODES} from "../res/Constants";
import PropTypes from 'prop-types'
import axios from "axios";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  maxHeight: 600
};

// Note: The coordinates should be E/W, N/S, +/-

const popScale = scaleLinear()
  .domain([8.4, 9.5])
  .range(["#FF0000", "#0000FF"]);

const popScale2 = scaleLinear()
  .domain([8.6, 9.6])
  .range(["#CFD8DC", "#607D8B"]);

export class Map extends React.Component {
  static propTypes = {
    handleOnClick: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      center: [0, 20],
      zoom: 1,
      isSatiafaction: false,
      data: undefined,
    };
    this.switchToPopulation = this.switchToPopulation.bind(this);
    this.switchToRegions = this.switchToRegions.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);

    const urls = US_STATES_STATE_CODES.map( e => BACKEND_API+'/data/states/'+e);
    const promises = urls.map( url => axios.get(url));
    let result = [];
    axios.all(promises)
        .then((responses) => {
          for (let i = 0; i < US_STATES.length; i++) {
            result.push({
              recommend: responses[i].data.averageLikelihoodToRecommend,
              satisfaction: responses[i].data.averageOverallSatisfaction,
            })
          }
          this.setState({data: result});
        })
        .catch((error) => {
          console.log(error)
        })
  }

  handleUserClick = (data) => {
    this.props.handleOnClick(data);
  };

  switchToPopulation() {
    this.setState({ isSatisfaction: true });
  }

  switchToRegions() {
    this.setState({ isSatisfaction: false });
  }

  render() {
    const field = this.state.isSatisfaction ? "satisfaction" : "recommend";
    return (
      <div>
        {
          this.state.data === undefined || this.state.data.length === 0
              ?
              <Row className="loading">
                <Col lg={12} md={12} sm={12} xs={12}>
                <Spin />
                </Col>
              </Row>
              :
              <Row className="map-buttons">
                <Col lg={12} md={12} sm={12} xs={12}>
                  <div style={wrapperStyles}>
                    <ComposableMap
                        projectionConfig={{ scale: 900 }}
                        width={1000}
                        height={600}
                        style={{
                          width: "100%",
                          height: "auto"
                        }}
                    >
                      <ZoomableGroup center={[-100, 40]} disablePanning>
                        <Geographies geography={geoData} disableOptimization>
                          {(geographies, projection) =>
                              geographies.map(
                                  (geography, i) =>
                                      US_STATES.indexOf(geography.id) !== -1 && (
                                          <Geography
                                              key={i}
                                              geography={geography}
                                              data-tip={
                                                geography.id +
                                                ": " + this.state.data[US_STATES.indexOf(geography.id)][field]

                                              }
                                              projection={projection}
                                              style={{
                                                default: {
                                                  fill: this.state.isSatisfaction
                                                      ? popScale(
                                                          this.state.data[US_STATES.indexOf(geography.id)][field]
                                                      )
                                                      : popScale2(
                                                          this.state.data[US_STATES.indexOf(geography.id)][field]
                                                      ),
                                                  stroke: "#607D8B",
                                                  strokeWidth: 0.75,
                                                  outline: "none"
                                                },
                                                hover: {
                                                  fill: this.state.isSatisfaction
                                                      ? chroma(
                                                          popScale(
                                                              this.state.data[US_STATES.indexOf(geography.id)][field]
                                                          )
                                                      ).darken(0.5)
                                                      : chroma(
                                                          popScale2(
                                                              this.state.data[US_STATES.indexOf(geography.id)][field]
                                                          )
                                                      ).darken(0.5),
                                                  stroke: "#607D8B",
                                                  strokeWidth: 0.75,
                                                  outline: "none"
                                                },
                                                pressed: {
                                                  fill: this.state.isSatisfaction
                                                      ? chroma(
                                                          popScale(
                                                              this.state.data[US_STATES.indexOf(geography.id)][field]
                                                          )
                                                      ).brighten(0.5)
                                                      : chroma(
                                                          popScale2(
                                                              this.state.data[US_STATES.indexOf(geography.id)][field]
                                                          )
                                                      ).brighten(0.5),
                                                  stroke: "#607D8B",
                                                  strokeWidth: 0.75,
                                                  outline: "none"
                                                }
                                              }}
                                              onClick={(geography) => this.handleUserClick(geography)}
                                          />
                                      )
                              )
                          }
                        </Geographies>
                      </ZoomableGroup>
                    </ComposableMap>
                    <ReactTooltip />
                  </div>
                </Col>

                <Col lg={12} md={12} sm={12} xs={12}>
                  <div className="color-buttons">
                    <Button variant="light" onClick={this.switchToPopulation}>
                      {"Recommendation likelihood"}
                    </Button>
                    <Button variant="light" onClick={this.switchToRegions}>
                      {"Overall Satisfaction"}
                    </Button>
                  </div>
                </Col>
              </Row>

         }
      </div>

    );
  }
}
