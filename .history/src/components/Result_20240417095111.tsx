// components/MyComponent.tsx
import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store"; // Import InputStoreState
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';

const MyComponent = () => {
  const { 
    initialCashBalance, 
    monthlyIncome, 
    monthlyGrowthRate, 
    payRoll, 
    nonPayRoll,
    validationErrors,
    setField 
  } = useInputStore();

  const cashBalanceData = calculateRunway({ initialCashBalance, payRoll, nonPayRoll });
  const { runway, monthsRemaining } = cashBalanceData[cashBalanceData.length - 1]; // Get the last month's values
  const projectedRevenueMonths = Math.max(3, Math.min(monthsRemaining, 12)); // Ensure the projected revenue months are between 3 and 12
  const projectedRevenue = calculateProjectedRevenue({ monthlyIncome, monthlyGrowthRate }, projectedRevenueMonths);

  // Use cashBalanceData in the chart data
  const chartData = {
    labels: cashBalanceData.slice(0, projectedRevenueMonths).map(data => `Month ${data.month}`), // Update chart labels to include months from 1 to projectedRevenueMonths
    datasets: [
      {
        label: 'Cash Balance',
        data: cashBalanceData.slice(0, projectedRevenueMonths).map(data => data.cashBalance), // Use cash balance data
        backgroundColor: 'rgba(19, 33, 60, 1)',
        borderColor: 'rgba(255, 215, 0, 1)',
      },
      {
        label: 'Projected Monthly Revenue',
        data: projectedRevenue.map((data) => Number(data.revenue)), // Include projected revenue
        backgroundColor: 'rgba(250, 180, 70, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
