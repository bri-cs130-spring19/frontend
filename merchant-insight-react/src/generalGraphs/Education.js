import React from 'react';
import '../styles/GeneralGraph.css'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label,
} from 'recharts';
import axios from 'axios';
import { BACKEND_API, EDUCATION } from '../res/Constants';
import { Assistant } from "../components/Assistant";


//TODO: Unique ethnicity is not fully determined yet. Relevant constants are stored in src/res/Constants.js
export class Education extends React.Component {
    constructor() {
        super();
        this.state = {
            data: undefined,
        }
    }

    componentDidMount() {
        const urls = EDUCATION.map( e => BACKEND_API+'/data/education?education='+e)
        const promises = urls.map( url => axios.get(url))
        let result = []
        axios.all(promises)
            .then((responses) => {
                for (let i = 0; i < EDUCATION.length; i++) {
                    result.push({
                        education: EDUCATION[i],
                        result: responses[i].data.averageOverallSatisfaction,
                    })
                }
                this.setState({data: result})
                console.log(this.state.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
    var minOption = "";
    if (this.state.data != undefined) {
        var min = 100000000;
        for (var i in this.state.data) {
            if (this.state.data[i].result < min) {
                min = this.state.data[i].result;
                minOption = this.state.data[i].education;
            }
        }
    }
      return (
          <div>
            {
                this.state.data === undefined || this.state.data.length === 0
                    ? <p>Loading</p>
                    :
                    <div>
                    <BarChart
                    width={1200}
                    height={500}
                    data={this.state.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="education">
                    <Label className="label" value="Average overall satisfaction by education level" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[8, 10]}/>
                    <Tooltip />
                    <Bar dataKey="result" fill="#8884d8" />
                </BarChart>
                <Assistant text={"Users are least satisfied with education of "+minOption+"."} />
                </div>
            }
        </div>
      );
    }
}