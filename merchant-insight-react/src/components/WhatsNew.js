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
      author={<a>Peter John</a>}
      avatar={<Avatar shape="square" size="large" icon="user" />}
      style={{ paddingLeft: 60}}
      content={
        <p>
          Wow. I had the worst shipping experience ever. I paid for 3 day shipping, 
          and my package kept getting delayed so many times. After 3 days, I didn't
          even need the package anymore, but I couldn't cancel the order! So now I can't
          get my money back until I receive the package. It's been 2 weeks, and I talked 
          to 3 representatives. NEVER ORDERING ANYTHING AGAIN.

        </p>
      }
    >
      {children}
    </Comment>
  );

  const Comment2 = ({ children }) => (
    <Comment
      author={<a>Anna J. K.</a>}
      avatar={<Avatar shape="square" size="large" icon="user" />}
      style={{ paddingLeft: 60}}
      content={
        <p>
          I wish they would put more photos of different kind of models on the website. 
          So tired of the same model. #Diversity !!!
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
    }
}

  componentDidMount() {
    this.siderOrDrawer();
    window.addEventListener("resize", this.siderOrDrawer.bind(this));
  }

    siderOrDrawer() {
      if (window.innerWidth < 992) {
          this.setState({isBigScreen: false});
      } else {
          this.setState({isBigScreen: true});
      }
  }

  render() {
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
           

        <Row className="Ling-Ling" >
              <Assistant
                text={"Nina, was this information helpful for you?"}
              />
        </Row>


        <Button style={{ marginLeft: 60}}>Yes</Button>
        <Button>No</Button>


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
