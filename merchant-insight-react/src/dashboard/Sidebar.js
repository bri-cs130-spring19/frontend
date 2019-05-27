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

const fakeGenderData = [
  { name: "female", value: 600 },
  { name: "male", value: 412 }
];

const fakeSatisfactionTrend = [
  { name: "Jan", satisfaction: 9800, amt: 9.2 },
  { name: "Feb", satisfaction: 9800, amt: 9.2 },
  { name: "Mar", satisfaction: 9800, amt: 9.0 },
  { name: "Apr", satisfaction: 3908, amt: 8.7 },
  { name: "May", satisfaction: 4800, amt: 8.8 },
  { name: "June", satisfaction: 4800, amt: 8.5 }
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

export class Sidebar extends React.Component {
  static propTypes = {
    curState: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Assistant
          text={"Your statistics for " + this.props.curState.id + " is here."}
        />
        <Assistant
          text={
            "For the past 6 months, consumer from " +
            this.props.curState.id +
            " has the following overall satisfaction."
          }
        />
        <LineChart
          width={400}
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
        <Assistant text={"The gender distribution is :"} />
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
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    );
  }
}
