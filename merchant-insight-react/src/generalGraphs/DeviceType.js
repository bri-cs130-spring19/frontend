import React from 'react';
import '../styles/GeneralGraph.css'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label,
} from 'recharts';
import axios from 'axios';
import { BACKEND_API, DEVICE_TYPE } from '../res/Constants';

export class DeviceType extends React.Component {
    constructor() {
        super();
        this.state = {
            data: undefined,
        }
        console.log("device type class constructor")
    }

    componentDidMount() {        
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

    render() {
      return (
          <div>
            {
                this.state.data === undefined || this.state.data.length == 0
                    ? <p>Loading</p>
                    :
                    <BarChart
                    width={1200}
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
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="result" fill="#8884d8" />
                </BarChart>
            }
        </div>
      );
    }
}