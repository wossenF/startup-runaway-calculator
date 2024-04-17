import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store"; // Import InputStoreState
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';

const MyComponent = () => {
  const { 
    initialCashBalance, 
    payRoll, 
    nonPayRoll,
    validationErrors,
    setField 
  } = useInputStore();

  const { runway, monthsRemaining } = calculateRunway({ initialCashBalance, payRoll, nonPayRoll });

  // Use monthsRemaining in the chart data
  const chartData = {
    labels: ['Months Remaining'], // Update chart label
    datasets: [
      {
        label: 'Months Remaining Before Runout',
        data: [monthsRemaining], // Use monthsRemaining instead of runway
        backgroundColor: 'rgba(19, 33, 60, 1)',
        borderColor: 'rgba(255, 215, 0, 1)',
      },
    ],
  };
  
  return (
    <>
      {/* Display validation errors */}
      {Object.values(validationErrors).map((error, index) => (
        <p key={index} style={{ color: 'red' }}>{error}</p>
      ))}
      {/* Input fields */}
      {/* You can replace this part with your input fields */}
      <input
        type="number"
        value={initialCashBalance}
        onChange={(e) => setField("initialCashBalance", parseInt(e.target.value))}
      />
      {/* End of input fields */}
      {/* Display runway value */}
      <p>Estimated Runway: {runway.toFixed(2)} months</p>
      {/* Display months remaining */}
      <p>Months Remaining Before Runout: {monthsRemaining}</p>
      {/* Render the BarChart component */}
      <BarChart datasets={chartData.datasets} labels={chartData.labels} />
    </>
  );
};

export default MyComponent;

export default MyComponent;