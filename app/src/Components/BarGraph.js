import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const BarGraph = ({ data }) => {
  const customData = {
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        backgroundColor: "#E2007B", // Set your desired color here
      },
    ],
  };

  return <Bar data={customData} />;
};

export default BarGraph;