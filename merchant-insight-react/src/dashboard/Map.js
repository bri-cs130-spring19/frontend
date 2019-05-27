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
import { Button, Row, Col } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { US_STATES } from "../res/Constants";
import PropTypes from 'prop-types'

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  maxHeight: 600
};


const age = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26
];

// Note: The coordinates should be E/W, N/S, +/-

const popScale = scaleLinear()
  .domain([1, 26])
  .range(["#FF0000", "#0000FF"]);

const popScale2 = scaleLinear()
  .domain([1, 26])
  .range(["#CFD8DC", "#607D8B"]);

export class Map extends React.Component {
  static propTypes = {
    handleOnClick: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      center: [0, 20],
      zoom: 1,
      fakeData: false
    };
    this.switchToPopulation = this.switchToPopulation.bind(this);
    this.switchToRegions = this.switchToRegions.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
  }

  handleUserClick = (data) => {
    this.props.handleOnClick(data);
  };

  switchToPopulation() {
    this.setState({ fakeData: true });
  }

  switchToRegions() {
    this.setState({ fakeData: false });
  }

  render() {
    return (
      <div>
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
                                ": " +
                                age[US_STATES.indexOf(geography.id)]
                              }
                              projection={projection}
                              style={{
                                default: {
                                  fill: this.state.fakeData
                                    ? popScale(
                                        age[US_STATES.indexOf(geography.id)]
                                      )
                                    : popScale2(
                                        age[US_STATES.indexOf(geography.id)]
                                      ),
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none"
                                },
                                hover: {
                                  fill: this.state.fakeData
                                    ? chroma(
                                        popScale(
                                          age[US_STATES.indexOf(geography.id)]
                                        )
                                      ).darken(0.5)
                                    : chroma(
                                        popScale2(
                                          age[US_STATES.indexOf(geography.id)]
                                        )
                                      ).darken(0.5),
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none"
                                },
                                pressed: {
                                  fill: this.state.fakeData
                                    ? chroma(
                                        popScale(
                                          age[US_STATES.indexOf(geography.id)]
                                        )
                                      ).brighten(0.5)
                                    : chroma(
                                        popScale2(
                                          age[US_STATES.indexOf(geography.id)]
                                        )
                                      ).brighten(0.5),
                                  stroke: "#607D8B",
                                  strokeWidth: 0.75,
                                  outline: "none"
                                }
                              }}
                              onClick={(geograpny) => this.handleUserClick(geography)}
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
                {"overall satisfaction"}
              </Button>
              <Button variant="light" onClick={this.switchToRegions}>
                {"checkout experience"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
