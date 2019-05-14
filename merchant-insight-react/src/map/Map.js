import React, { Component } from "react"
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps"
import geoData from "../res/us5.json"
import {geoAlbersUsa} from "d3-geo";

class Map extends Component {

    constructor() {
        super()
        this.state = {
            center: [0,20],
            zoom: 1,
        }
    }
    render() {
        return(
            <div>
                <ComposableMap
                    projection={geoAlbersUsa}
                    projectionConfig={{ scale: 100 }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <Geographies geography={geoData}>
                        {(geographies, projection) => geographies.map(geography => (
                            <Geography
                                key={ geography.id }
                                geography={ geography }
                                projection={ projection }
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
                            />
                        ))}
                    </Geographies>
                </ComposableMap>
            </div>
        )
    }
}


export default Map;
