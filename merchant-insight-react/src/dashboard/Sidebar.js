import React from "react";
import { Assistant } from "../components/Assistant";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import PropTypes from "prop-types";
import {BACKEND_API, US_STATES, US_STATES_STATE_CODES} from "../res/Constants";
import axios from "axios";
import {Col, Row} from "react-bootstrap";
import {Spin} from "antd";

const fakeGenderData = [
  { name: "female", value: 600 },
  { name: "male", value: 412 }
];

const fakeSatisfactionTrend = [
  { name: "Nov", satisfaction: 9.2, amt: 9.2 },
  { name: "Dec", satisfaction: 9.2, amt: 9.2 },
  { name: "Jan", satisfaction: 9.0, amt: 9.0 },
  { name: "Feb", satisfaction: 8.7, amt: 8.7 },
  { name: "Mar", satisfaction: 8.8, amt: 8.8 },
  { name: "Apr", satisfaction: 8.5, amt: 8.5 }
];

const COLORS = ["#0088FE", "#FF8042"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            isSatisfaction: false,
            data: undefined,
        };
    }

    componentDidMount() {
        // const urls = [US_STATES_STATE_CODES[US_STATES.indexOf(this.props.curState.id)]].map( e => BACKEND_API+'/data/states/'+e+'?startMonth=11&startYear=2018&endMonth=4&endYear=2019');
        // const promises = urls.map( url => axios.get(url));
        // let result = [];
        // axios.all(promises)
        //     .then((responses) => {
        //         for (let i = 0; i < 1; i++) {
        //             var female = {};
        //             var male = {};
        //             var months = [];
        //             female.name = "female";
        //             male.name = "male";
        //             female.value = responses[i].data.numberFemales;
        //             male.value = responses[i].data.numberMales;
        //             months = responses[i].data.averageOverallSatisfactionByMonth;
        //             result.push([female, male, months]);

        //         }
        //         this.setState({data: result});

        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

  static propTypes = {
    curState: PropTypes.object.isRequired
  };

  render() {
    //console.log(this.props)
    var realGenderData = [];
    var realSatisfactionTrend = [
      { name: "Dec", satisfaction: 9.2, amt: 9.2 },
      { name: "Jan", satisfaction: 9.0, amt: 9.0 },
      { name: "Feb", satisfaction: 8.7, amt: 8.7 },
      { name: "Mar", satisfaction: 8.8, amt: 8.8 },
      { name: "Apr", satisfaction: 8.5, amt: 8.5 },
      { name: "May", satisfaction: 9.1, amt: 9.1 },
    ];
    if (this.props.data != undefined) {
      realGenderData = this.props.data[0].slice(0, 2)
      //console.log(realGenderData)
      for (var i in this.props.data[0][2]) {
        realSatisfactionTrend[i].satisfaction = this.props.data[0][2][i];
        realSatisfactionTrend[i].amt = this.props.data[0][2][i];
      }
    }
      if (this.props.data === undefined || this.props.data.length === 0) {
                return ( <div>
                    <Row className="loading">
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Spin />
                        </Col>
                    </Row>
                </div>)
      } else {
          return(
              <div>
                  <Assistant
                      text={"Your statistics for " + this.props.curState.id + " are here."}
                  />
                  <Assistant
                      text={
                          "For the past 6 months, consumer from " +
                          this.props.curState.id +
                          " has the following overall satisfaction."
                      }
                  />
                  <LineChart
                      width={300}
                      height={200}
                      data={realSatisfactionTrend}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Line
                          type="monotone"
                          dataKey="satisfaction"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                      />
                  </LineChart>
                  <Assistant text={"The gender distribution is :"} />
                  <PieChart width={300} height={200}>
                      <Pie
                          data={realGenderData}
                          cx={150}
                          cy={100}
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                      >
                          {realGenderData.map((entry, index) => (
                              <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                              />
                          ))}
                      </Pie>
                      <Tooltip />
                  </PieChart>
              </div>
          )
      }


  }
}
