import React from "react";
import { Assistant } from "./Assistant";
import { Row } from "react-bootstrap";
import { Comment, Avatar } from 'antd';
import { Button } from 'antd';
import '../styles/WhatsNew.css'
import {
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    RadarChart,
    Radar,
    PolarAngleAxis,
    PolarRadiusAxis,
    PolarGrid
  } from "recharts";
import {BACKEND_API, US_STATES, US_STATES_STATE_CODES} from "../res/Constants";
import axios from "axios";

const fakeSatisfactionTrend = [
    { name: "Sun", satisfaction: 75},
    { name: "Mon", satisfaction: 76},
    { name: "Tues", satisfaction: 44},
    { name: "Wed", satisfaction: 74},
    { name: "Thur", satisfaction: 74.5},
    { name: "Fri", satisfaction: 73.5}
  ];
  const data = [
    {
      "subject": "Shipping Experience",
      "A": 140,
      "B": 110,
      "fullMark": 150
    },
    {
      "subject": "Satisfaction",
      "A": 98,
      "B": 130,
      "fullMark": 150
    },
    {
      "subject": "Recommend",
      "A": 86,
      "B": 130,
      "fullMark": 150
    },
    {
      "subject": "Purchase amount",
      "A": 99,
      "B": 100,
      "fullMark": 150
    },
    {
      "subject": "Buy again",
      "A": 85,
      "B": 90,
      "fullMark": 150
    }

  ]

  const Comment1 = ({ children }) => (
    <Comment
      author={<a>jfzzcakqsmuw@yahoo.com</a>}
      avatar={<Avatar shape="square" size="large" icon="user" />}
      style={{ paddingLeft: 60}}
      content={
        <p>
        It was just bloody awful. The prices were not correct and in the end you charged me for shipping even though you say that over $&( it's free. 
        </p>
      }
    >
      {children}
    </Comment>
  );

  const Comment2 = ({ children }) => (
    <Comment
      author={<a>ncvwoxkrbnie@aol.com</a>}
      avatar={<Avatar shape="square" size="large" icon="user" />}
      style={{ paddingLeft: 60}}
      content={
        <p>
        Wasn’t very pleased with the check out. Options on way of paying are limited.
        </p>
      }
    >
      {children}
    </Comment>
  );

  const Comment3 = ({ children }) => (
    <Comment
      author={<a>jfzzcakqsmuw@yahoo.com</a>}
      avatar={<Avatar shape="square" size="large" icon="user" />}
      style={{ paddingLeft: 60}}
      content={
        <p>
        Discount code did not apply to all items. Site was made very poorly. Fire your web developers
        </p>
      }
    >
      {children}
    </Comment>
  );


export class WhatsNew extends React.Component {
  constructor() {
    super();
    this.state = {
        collapsed: false,
        isBigScreen: true,
        visible: false,
        top: 12,
        data: undefined
    }
}

  componentDidMount() {
    this.siderOrDrawer();
    window.addEventListener("resize", this.siderOrDrawer.bind(this));

        const urls = ["test"].map( e => BACKEND_API+'/data/states?startMonth=12&startYear=2018&endMonth=5&endYear=2019');
        const promises = urls.map( url => axios.get(url));
        let result = [];
        axios.all(promises)
            .then((responses) => {
                for (let i = 0; i < 1; i++) {
                    var months = responses[i].data.averageOverallSatisfactionByMonth;

                }
                this.setState({data: months});

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
    var realSatisfactionTrend = [
      { name: "Dec", satisfaction: 9.2, amt: 9.2 },
      { name: "Jan", satisfaction: 9.0, amt: 9.0 },
      { name: "Feb", satisfaction: 8.7, amt: 8.7 },
      { name: "Mar", satisfaction: 8.8, amt: 8.8 },
      { name: "Apr", satisfaction: 8.5, amt: 8.5 },
      { name: "May", satisfaction: 9.1, amt: 9.1 }
    ];
    if (this.state.data != undefined) {
      for (var i in this.state.data) {
        realSatisfactionTrend[i].satisfaction = this.state.data[i];
        realSatisfactionTrend[i].amt = this.state.data[i];
      }
    }
    if (this.state.data === undefined) {
      return ( <div>
          <Row className="loading">
          </Row>
      </div>)
    } else {
    return (
      this.state.isBigScreen ?
        <div className="WhatsNew">
        <Row className="Ling-Ling">
              <Assistant
                text={"Welcome back, Nina."}
              />
        </Row>

        <Row className="Ling-Ling" >
              <Assistant
                text={"The overall satisfaction for the last 6 months is here."}
              />
        </Row>

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

        <Row className="Ling-Ling" >
              <Assistant
                text={"Here is a summary of this week (green) vs last week (purple)."}
              />
        </Row>

       
        <RadarChart outerRadius={90} width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Last Week" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="This Week" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
        

        <Row className="Ling-Ling" >
              <Assistant
                text={"These are the few most important outliers I found from this week:"}
              />
        </Row>

            
        <Comment1>
        </Comment1>
        <Comment2>
        </Comment2>
        <Comment3>
        </Comment3>
           

        <Row className="Ling-Ling" >
              <Assistant
                text={"Nina, was this information helpful for you?"}
              />
        </Row>

        <Button onclick="ClickYes()" style={{ marginLeft: 60}}>Yes</Button>
        <Button onclick="ClickNo()" >No</Button>


    </div>



      :  /* TODO: make it better. Right now it is just a copy paste of the above*/ 



      <div className="WhatsNew">
        <Row className="Ling-Ling">
              <Assistant
                text={"Welcome back, Nina."}
              />
        </Row>

        <Row className="Ling-Ling" >
              <Assistant
                text={"The overall satisfaction for the last 5 days is here."}
              />
        </Row>
        <LineChart
          width={300}
          height={200}
          data={fakeSatisfactionTrend}
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

        <Row className="Ling-Ling" >
              <Assistant
                text={"Here is a summary of this week (green) vs last week (purple)."}
              />
        </Row>

       
        <RadarChart outerRadius={90} width={350} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Last Week" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="This Week" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
        

        <Row className="Ling-Ling" >
              <Assistant
                text={"These are the few most important outliers I found from this week:"}
              />
        </Row>

            
        <Comment1>
        </Comment1>
        <Comment2>
        </Comment2>
           

        <Row className="Ling-Ling" >
              <Assistant
                text={"Nina, was this information helpful for you?"}
              />
        </Row>

        <Button onclick="ClickYes()" style={{ marginLeft: 60}}>Yes</Button>
        <Button onclick="ClickNo()" >No</Button>
        </div>
    );
  }


  }
}
