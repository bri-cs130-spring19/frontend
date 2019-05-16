import React from "react";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,

} from "react-simple-maps"
import chroma from 'chroma-js'
import { scaleLinear } from "d3-scale"
import geoData from "../res/us7.json";
import '../styles/Map.css'



const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
    maxHeight: 600,
}

const include = [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California','Colorado', 'Connecticut', 'Delaware', 'District of Columbia',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

const age = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]

// Note: The coordinates should be E/W, N/S, +/-
const markers = [
    { markerOffset: 0,  name: "Los Angeles", coordinates: [-118, 34] },
    { markerOffset: 0,  name: "San Diego", coordinates: [-117.1611, 32.7157] },
    { markerOffset: 0,  name: "New York", coordinates: [-74.0060, 40.7128] },
]


const popScale = scaleLinear()
    .domain([1,26])
    .range(["#FF0000","#0000FF"])

const popScale2 = scaleLinear()
    .domain([1,26])
    .range(["#CFD8DC","#607D8B"])

export class Map extends React.Component {

    constructor() {
        super()
        this.state = {
            center: [0,20],
            zoom: 1,
            populationData: false,
        }
        this.switchToPopulation = this.switchToPopulation.bind(this)
        this.switchToRegions = this.switchToRegions.bind(this)
    }

    handleUserClick = (data) => {
        this.props.handleUserInteraction();
        this.props.handleOnClick(data);
    }

    switchToPopulation() {
        this.setState({ populationData: true })
        console.log(this)
    }

    switchToRegions() {
        this.setState({ populationData: false })
    }

    render() {
        return (

            <div>


            <div style={wrapperStyles}>
                <ComposableMap
                    projectionConfig={{ scale: 900 }}
                    width={1000}
                    height={600}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                >


                <ZoomableGroup center={[ -100, 40]} disablePanning>
                    <Geographies geography={geoData}>
                        {(geographies, projection) =>
                            geographies.map((geography, i) =>
                                include.indexOf(geography.id) !== -1 && (
                                    <Geography
                                        key={i}
                                        geography={geography}
                                        projection={projection}
                                        style={{
                                            default: {
                                                fill: this.state.populationData
                                                    ? popScale(age[include.indexOf(geography.id)])
                                                    : popScale2(age[include.indexOf(geography.id)]),
                                                stroke: "#607D8B",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            },
                                            hover: {
                                                fill: this.state.populationData
                                                    ? chroma(popScale(age[include.indexOf(geography.id)])).darken(0.5)
                                                    : chroma(popScale2(age[include.indexOf(geography.id)])).darken(0.5),
                                                stroke: "#607D8B",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            },
                                            pressed: {
                                                fill: this.state.populationData
                                                    ? chroma(popScale(age[include.indexOf(geography.id)])).brighten(0.5)
                                                    : chroma(popScale2(age[include.indexOf(geography.id)])).brighten(0.5),
                                                stroke: "#607D8B",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            },
                                        }}
                                        onClick={ this.handleUserClick.bind(geography) }
                                    />
                                )
                            )
                        }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                <div>
                    <button onClick={ this.switchToPopulation }>
                        { "Age data" }
                    </button>
                    <button onClick={ this.switchToRegions }>
                        { "US subregions" }
                    </button>
                </div>
                </div>
            </div>
        )
    }
}


