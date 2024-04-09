import React from "react";
import BarChart from "./BarChart";

const Result: React.FC = () => {
  const data = [50, 20, 80, 40, 50, 60, 10, 25, 45, 24, 41, 11];
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div >
      <h1>Bar Chart Example</h1>
      <BarChart
  datasets={[
    {
      label: 'Dataset 1',
      data: [10, 20, 30],
      backgroundColor: 'rgba(250, 180, 70, 0.6)' // Example color for Dataset 1
    },
    {
      label: 'Dataset 2',
      data: [15, 25, 35],
      backgroundColor: 'rgba(19)' // Example color for Dataset 2
    }
  ]}
  labels={['Label 1', 'Label 2', 'Label 3']}
/>

    </div>
  );
};

export default Result;
