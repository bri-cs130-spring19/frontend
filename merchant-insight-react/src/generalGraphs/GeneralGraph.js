import React from 'react';
import '../styles/GeneralGraph.css'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label,
} from 'recharts';
import axios from 'axios';
import { BACKEND_API, ETHNICITY, ETHNICITY_SHORT } from '../res/Constants';


//TODO: Unique ethnicity is not fully determined yet. Relevant constants are stored in src/res/Constants.js
export class GeneralGraph extends React.Component {
    constructor() {
        super();
        this.state = {
            data: undefined,
        }
    }

    componentDidMount() {
        const urls = ETHNICITY.map( e => BACKEND_API+'/data/ethnicity?ethnicity='+e)
        const promises = urls.map( url => axios.get(url))
        let result = []
        axios.all(promises)
            .then((responses) => {
                for (let i = 0; i < ETHNICITY.length; i++) {
                    result.push({
                        ethnicity: ETHNICITY_SHORT[i],
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
                    <XAxis dataKey="ethnicity">
                    <Label className="label" value="Average overall satisfaction by ethnicities" offset={0} position="insideBottom" />
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
  