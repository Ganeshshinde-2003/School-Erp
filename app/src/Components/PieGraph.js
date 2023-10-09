import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const PieGraph = ({ data }) => {
  return <Pie data={data} />;
};

export default PieGraph;
