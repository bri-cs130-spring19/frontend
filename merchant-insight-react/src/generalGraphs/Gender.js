import React from 'react';
import '../styles/GeneralGraph.css'
import {
    ResponsiveContainer, PieChart, Pie, Sector, Cell, Tooltip, Label,
} from 'recharts';
import axios from 'axios';
import { BACKEND_API, GENDER } from '../res/Constants';
import { Row, Col } from "react-bootstrap";
import { Assistant } from "../components/Assistant";

const fakeGenderData = [
    { name: "female", value: 600 },
    { name: "male", value: 412 }
  ];

const COLORS = ["#0088FE", "#FF8042"];
const GENDER_COLORS = ["#FF1493", "#0088FE"];
const MALE_COLORS = ["#0088FE","FF8042"];
const FEMALE_COLORS = ["#FF1493","FF8042"]

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
cx,
cy,
midAngle,
innerRadius,
outerRadius,
percent,
index
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
  

export class Gender extends React.Component {
    constructor() {
        super();
        this.state = {
            data: undefined,
        }
    }


    /*
    componentDidMount() {
        const urls = GENDER.map( e => BACKEND_API+'/data/gender?gender='+e)
        const promises = urls.map( url => axios.get(url))
        let result = []
        axios.all(promises)
            .then((responses) => {
                for (let i = 0; i < GENDER.length; i++) {
                    result.push({
                        gender: GENDER[i],
                        result: responses[i].data.likelihoodToRecommend,
                    })
                }
                this.setState({data: result})
                console.log(this.state.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    */

    render() {
      return (
          <div className="gender">
            <Row>
                <h1>Gender Survey Data</h1>
            </Row>
            <Row>
            <Assistant
                text={"This is the gender ratio of your survey responses."}
              />
            </Row>
            <Row className="justify-content-md-center">
                <PieChart width={400} height={200}>
                    <Pie
                        data={fakeGenderData}
                        cx={200}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                    {fakeGenderData.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                        />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </Row>                
            <Row>
            <Assistant
                text={"This is the likelihood for each gender to recommend your product."}
              />
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={4} md={12} sm={12} xs={12}>
                    <PieChart width={400} height={200}>
                        <Pie
                            data={fakeGenderData}
                            cx={125}
                            cy={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                        {fakeGenderData.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={MALE_COLORS[index % MALE_COLORS.length]}
                            />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <h5>Males</h5>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                    <PieChart width={400} height={200}>
                        <Pie
                            data={fakeGenderData}
                            cx={125}
                            cy={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                        {fakeGenderData.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={FEMALE_COLORS[index % FEMALE_COLORS.length]}
                            />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <h5>Females</h5>
                </Col>
            </Row>

        </div>
        
      );
    }
}