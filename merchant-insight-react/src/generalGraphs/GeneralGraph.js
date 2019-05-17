import React from 'react';
import '../styles/GeneralGraph.css'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';
import { BACKEND_API } from '../res/Constants';

const data = [
  {
    ethnicity: "Page A", result: 4000, 
  },
  {
    ethnicity: 'Page B', result: 3000, 
  },
  {
    ethnicity: 'Page C', result: 2000, 
  },
  {
    name: 'Page D', pv: 2780, 
  },
  {
    name: 'Page E', pv: 1890, 
  },
  {
    name: 'Page F', pv: 2390, 
  },
  {
    name: 'Page G', pv: 3490, 
  },
];
// Not sure it covers all
// Probably better way to do this, by query to database
// Save consts at backend?
const ETHNICITY = [
  'African-American',
  'American Indian or Alaska Native',
  'Asian or Pacific Islander',
  'Caucasian',
  'Hispanic or Latino',
  'Multiracial',
  'Other',
  'Prefer not to answer',
];

  
  export class GeneralGraph extends React.Component {
    //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

    
    // class function
    // Send GET request based on "ethnicity"
    // Store reponse data
    getOverallSatifaction () {
      var overallStaisfactionArray = [];
      
      for (const eth of ETHNICITY) {
        axios.get(BACKEND_API+'/data/ethnicity?ethnicity=' + eth)
          .then(function (response) {
            //console.log(response);
            // should have avoided data manipulation at frontent
            var value = parseFloat(response.data['averageOverallSatisfaction']);
            console.log(value);
            overallStaisfactionArray.push(
              {
                ethnicity: String(eth),
                result: value,
              }
            );
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      console.log(overallStaisfactionArray);
      return overallStaisfactionArray;
    }
  
    render() {
      return (
        <div>
          {this.getOverallSatifaction()}
          <BarChart
            width={500}
            height={300}
            data={this.getOverallSatifaction()}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ethnicity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="result" fill="#8884d8" />
          </BarChart>
        </div>
      );
    }
  }
  