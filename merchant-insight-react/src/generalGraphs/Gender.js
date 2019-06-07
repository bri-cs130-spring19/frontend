import React from 'react';
import '../styles/Gender.css'
import {
    ResponsiveContainer, PieChart, Pie, Sector, Cell, Tooltip, Label,
} from 'recharts';
import axios from 'axios';
import { BACKEND_API, GENDER } from '../res/Constants';
import { Row, Col } from "react-bootstrap";
import { Assistant } from "../components/Assistant";

const fakeGenderData = [
    { name: "female", value: 0 },
    { name: "male", value: 4120 }
  ];

const MaleRecommendData = [
    { name: "Recommend", value: 2703 },
    { name: "Not Recommend", value: 1504 }
  ];

const FemaleRecommendData = [
    { name: "Recommend", value: 3921 },
    { name: "Not Recommend", value: 1672 }
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


    
    componentDidMount() {
        const urls = GENDER.map( e => BACKEND_API+'/data/gender?gender='+e)
        const promises = urls.map( url => axios.get(url))
        let result = []
        axios.all(promises)
            .then((responses) => {
                console.log(responses)
                    
                var female = {};
                var male = {};
                female.name = "Female";
                male.name = "Male";
                female.value = responses[0].data.numberFemales;
                male.value = responses[1].data.numberMales;
                result.push(female, male);

                this.setState({data: result})
                console.log(this.state.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    

    render() {
        //console.log(this.state.data)
        // var minOption = "";
        // if (this.state.data != undefined) {
        //     var min = 100000000;
        //     for (var i in this.state.data) {
        //         if (this.state.data[i].result < min) {
        //             min = this.state.data[i].result;
        //             minOption = this.state.data[i].ethnicity;
        //         }
        //     }
        // }
      return (
          <div className="gender">
            <Row>
                <h2>Gender Survey Data</h2>
            </Row>
            <Row>
            
            </Row>
            <Row>
                <PieChart width={300} height={200}>
                    <Pie
                        data={this.state.data}
                        cx={150}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
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
            <Assistant
                text={"More females take your surveys than males."}
              />               
            <Row>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={4} md={12} sm={12} xs={12}>
                    <PieChart width={300} height={200}>
                        <Pie
                            data={MaleRecommendData}
                            cx={150}
                            cy={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                        {MaleRecommendData.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={MALE_COLORS[index % MALE_COLORS.length]}
                            />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <p>Males</p>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                    <PieChart width={300} height={200}>
                        <Pie
                            data={FemaleRecommendData}
                            cx={150}
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
                    <p>Females</p>
                </Col>
            </Row>
            <Assistant
                text={"Females recommend your product at a higher rate than males."}
              />

        </div>
        
      );
    }
}