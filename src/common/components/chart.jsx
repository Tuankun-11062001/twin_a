import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["date", "View"],
  ["30/12", 1000],
  ["31/12", 1170],
  ["1/1", 660],
  ["2/1", 1030],
];

export const options = {
  curveType: "function",
  legend: { position: "bottom" },
};

const ChartLine = () => {
  return <Chart chartType="LineChart" data={data} options={options} />;
};

export default ChartLine;
