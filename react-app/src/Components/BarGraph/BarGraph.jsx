import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Legend,
  Tooltip,
} from "recharts";

import "./bar-graph.css";

const BarGraph = ({
  apiData,
  width,
  height,
  strokeDasharray,
  xAxisDataKey,
  yAxisDataKey,
  barColor,
}) => {
  return (
    <BarChart data={apiData} width={width} height={height}>
      <CartesianGrid strokeDasharray={strokeDasharray} />
      <XAxis dataKey={xAxisDataKey} />
      <YAxis dataKey={yAxisDataKey} />
      <Tooltip />
      <Legend />
      <Bar dataKey={yAxisDataKey} fill={barColor} name={yAxisDataKey} />
    </BarChart>
  );
};

export default BarGraph;
