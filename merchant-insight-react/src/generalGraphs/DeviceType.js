import React from 'react';
import '../styles/GeneralGraph.css'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label,
} from 'recharts';
import axios from 'axios';
import { BACKEND_API, DEVICE_TYPE } from '../res/Constants';
import { Assistant } from "../components/Assistant";

export class DeviceType extends React.Component {
    constructor() {
        super();
        this.state = {
            data: undefined,
            collapsed: false,
            isBigScreen: true,
            visible: false,
            top: 12,
        }
        console.log("device type class constructor")
    }

    componentDidMount() {
        this.siderOrDrawer();
        window.addEventListener("resize", this.siderOrDrawer.bind(this));

        const urls = DEVICE_TYPE.map( e => BACKEND_API+'/data/device_type?device_type='+e)
        const promises = urls.map( url => axios.get(url))
        let result = []
        axios.all(promises)
            .then((responses) => {
                for (let i = 0; i < DEVICE_TYPE.length; i++) {
                    result.push({
                        device_type: DEVICE_TYPE[i],
                        result: responses[i].data.averageOverallSatisfaction,
                    })
                }
                this.setState({data: result})
            })
            .catch((error) => {
                console.log(error)
            })

    }

    siderOrDrawer() {
        if (window.innerWidth < 992) {
            this.setState({isBigScreen: false});
        } else {
            this.setState({isBigScreen: true});
        }
    }

    render() {
        var minOption = "";
        if (this.state.data != undefined) {
            var min = 100000000;
            for (var i in this.state.data) {
                if (this.state.data[i].result < min) {
                    min = this.state.data[i].result;
                    minOption = this.state.data[i].device_type;
                }
            }
        }
      return (
          this.state.isBigScreen?
          <div>
            {
                this.state.data === undefined || this.state.data.length == 0
                    ? <p>Loading</p>
                    :
                    <div>
                    <BarChart
                    width={800}
                    height={500}
                    data={this.state.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="device_type">
                    <Label className="label" value="Average overall satisfaction by device type" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[8, 10]}/>
                    <Tooltip />
                    <Bar dataKey="result" fill="#8884d8" />
                </BarChart>
                <Assistant text={"Users are least satisfied when using "+minOption+"."} /> 
                </div>
            }
        </div>
        :
        <div>
            {
                this.state.data === undefined || this.state.data.length == 0
                    ? <p>Loading</p>
                    :
                    <div>
                    <BarChart
                    width={window.innerWidth - 100}
                    height={250}
                    data={this.state.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="device_type">
                    <Label className="label" value="Average overall satisfaction by device type" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[8, 10]}/>
                    <Tooltip />
                    <Bar dataKey="result" fill="#8884d8" />
                </BarChart>
                <Assistant
                text={"Users are least satisfied when using "+minOption+"."}
                /> 
                </div>
            }
        </div>
      );
    }
}