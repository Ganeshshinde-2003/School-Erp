import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const BarGraph = ({ data }) => {
  return <Bar data={data} />;
};

export default BarGraph;
