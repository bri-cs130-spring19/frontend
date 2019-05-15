import React from "react";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
} from "react-simple-maps"
import geoData from "../res/us7.json";
import '../styles/Map.css'


const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
}

const include = [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California','Colorado', 'Connecticut', 'Delaware', 'District of Columbia',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

// Note: The coordinates should be E/W, N/S, +/-
const markers = [
    { markerOffset: 0,  name: "Los Angeles", coordinates: [-118, 34] },
    { markerOffset: 0,  name: "San Diego", coordinates: [-117.1611, 32.7157] },
    { markerOffset: 0,  name: "New York", coordinates: [-74.0060, 40.7128] },
]

export class Map extends React.Component {

    constructor() {
        super()
        this.state = {
            center: [0,20],
            zoom: 1,
        }
    }

    handleUserClick = (data) => {
        this.props.handleUserInteraction();
        this.props.handleOnClick(data);
    }

    render() {
        return (
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
                                                fill: "#ECEFF1",
                                                stroke: "#607D8B",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            },
                                            hover: {
                                                fill: "#CFD8DC",
                                                stroke: "#607D8B",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            },
                                            pressed: {
                                                fill: "#FF5722",
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
                    <Markers>
                        {markers.map((marker, i) => (
                            <Marker
                                key={i}
                                marker={marker}
                                style={{
                                    default: { stroke: "#455A64" },
                                    hover: { stroke: "#FF5722" },
                                    pressed: { stroke: "#FF5722" },
                                }}
                            >
                                <g transform="translate(-12, -24)">
                                    <path
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="square"
                                        strokeMiterlimit="10"
                                        strokeLinejoin="miter"
                                        d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
                                    />
                                    <circle
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="square"
                                        strokeMiterlimit="10"
                                        strokeLinejoin="miter"
                                        cx="12"
                                        cy="9"
                                        r="3"
                                    />
                                </g>
                                <text
                                    textAnchor="middle"
                                    y={marker.markerOffset}
                                    style={{
                                        fontFamily: "Roboto, sans-serif",
                                        fill: "#607D8B",
                                        stroke: "none",
                                    }}
                                >
                                    {marker.name}
                                </text>
                            </Marker>
                        ))}
                    </Markers>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
    }
}


