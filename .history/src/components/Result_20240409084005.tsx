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
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <h1>Bar Chart Example</h1>
      <div className="grid grid-cols-2 gap-10">
        <BarChart data={data} labels={labels} />
        <BarChart data={data} labels={labels} />
      </div>
    </div>
  );
};

export default Result;
