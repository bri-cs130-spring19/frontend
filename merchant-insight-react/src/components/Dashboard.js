import React from 'react'
import { Map } from '../map/Map'
import { Comment, Avatar } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import '../styles/Dashboard.css'

const fakeGenderData = [
    {name: 'female', value: 600},
    {name: 'male', value: 412},
]

const fakeSatisfactionTrend = [
    {name: 'Jan', satisfaction: 9800, amt: 9.2},
    {name: 'Feb', satisfaction: 9800, amt: 9.2},
    {name: 'Mar', satisfaction: 9800, amt: 9.0},
    {name: 'Apr', satisfaction: 3908, amt: 8.7},
    {name: 'May', satisfaction: 4800, amt: 8.8},
    {name: 'June', satisfaction: 4800, amt: 8.5},
];

const COLORS = ['#0088FE', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
                                   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
                               }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export class Dashboard extends React.Component {
    state = {
        userClicked: false,
        curState: null,
    }

    handleUserInteraction = () => {
        this.setState({ userClicked: true } )
    }

    handleOnClick = (data) => {
        this.setState({curState: data})
    }


    render() {
        return (
            <div className='dashboard'>
                <Row className='test'>
                <Col lg={8} md={12} sm={12} xs={12}>
                <Map handleUserInteraction={this.handleUserInteraction} handleOnClick={this.handleOnClick} className='DashboardMap' lg='2' />
                </Col>
                {
                    this.state.userClicked ?
                        <Col className="Ling-Ling" lg={4} md={10} sm={10} xs={10}>
                        <Comment className="Ling-Ling"
                            author={<a>Ling Ling</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={'Your statistics for ' + this.state.curState.id + ' is here.'}

                        />
                        <Comment className="Ling-Ling"
                                 author={<a>Ling Ling</a>}
                                 avatar={
                                     <Avatar
                                         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                         alt="Han Solo"
                                     />
                                 }
                                 content={'For the past 6 months, consumers from ' + this.state.curState.id + ' has the following overall satisfaction.' }

                        />
                            <LineChart width={400} height={200} data={fakeSatisfactionTrend}
                                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Line type="monotone" dataKey="satisfaction" stroke="#8884d8" activeDot={{r: 8}}/>
                            </LineChart>
                            <Comment className="Ling-Ling"
                                     author={<a>Ling Ling</a>}
                                     avatar={
                                         <Avatar
                                             src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                             alt="Han Solo"
                                         />
                                     }
                                     content={'The gender distribution of ' + this.state.curState.id + ' is: ' }

                            />
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
                                    {
                                        fakeGenderData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </Col>
                        :
                        <Col className="Ling-Ling" lg={4} md={10} sm={10} xs={10}>
                        <Comment className="Ling-Ling"
                                   author={<a>Ling Ling</a>}
                                   avatar={
                                       <Avatar
                                           src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                           alt="Han Solo"
                                       />
                                   }
                                   content={'Click on any state to see more detailed information.'}

                        />
                        </Col>
                }
                </Row>
            </div>
        )
    }


}