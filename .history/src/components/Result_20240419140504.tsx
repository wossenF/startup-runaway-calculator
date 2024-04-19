import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import useInputStore, { InputStoreState } from "../store/store";
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';

const MyComponent: React.FC = () => {
  const { 
    initialCashBalance, 
    currentCashBalance,
    monthlyIncome, 
    monthlyGrowthRate, 
    cogsPercentage, 
    payRoll, 
    nonPayRoll,
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline,
    newHiresTimeline,
    validationErrors,
    setField 
  } = useInputStore();

  interface ProjectedData {
    month: number;
    revenue: number;
    cashBalance: number;
  }

  const [runway, setRunway] = useState<number>(0);
  const [projectedData, setProjectedData] = useState<ProjectedData[]>([]);

  useEffect(() => {
    // Calculate runway and projected data whenever the input values change
    const userInput: InputStoreState = { 
      initialCashBalance, 
      currentCashBalance,
      monthlyIncome, 
      monthlyGrowthRate, 
      cogsPercentage, 
      payRoll, 
      nonPayRoll,
      fundraisingAmount,
      monthlyCompensation,
      nonPayrollReduction,
      nonPayrollReductionTimeline,
      fundraisingTimeline,
      newHiresTimeline,
      validationErrors
    };
    const calculatedRunway = calculateRunway(userInput);
    const calculatedProjectedData = calculateProjectedData(userInput, 12);
    
    setRunway(calculatedRunway.runway);
    setProjectedData(calculatedProjectedData);
  }, [
    initialCashBalance, 
    monthlyIncome, 
    monthlyGrowthRate, 
    cogsPercentage, 
    payRoll, 
    nonPayRoll,
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline,
    newHiresTimeline,
    validationErrors
  ]);

  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);

  const chartData = {
    labels: projectedData.map(data => `Month ${data.month}`),
    datasets: [
      {
        label: 'Projected Monthly Revenue',
        data: projectedData.map(data => data.revenue), 
        backgroundColor: 'rgba(19, 33, 60, 1)',
        borderColor: 'rgba(19, 33, 60, 1)',
      },
      {
        label: 'Current Cash Balance',
        data: projectedData.map(data => data.cashBalance),
        type: 'line',
        fill: false,
        backgroundColor: 'rgba(250, 180, 70, 1)',
        borderColor: 'rgba(250, 180, 70, 1)',
      },
    ],
  };
  
  return (
    <>
      <input
        type="number"
        value={initialCashBalance}
        onChange={(e) => setField("initialCashBalance", parseInt(e.target.value))}
      />
      {/* Display validation errors if any */}
      {Object.values(validationErrors).map((error, index) => (
        <p key={index} style={{ color: 'red' }}>{error}</p>
      ))}
      <p>Estimated Runway: {runway} months</p>
      <LineChart datasets={chartData.datasets} labels={chartData.labels} />
    </>
  );
};

export default MyComponent;

function calculateProjectedData(userInput: InputStoreState, months: number): ProjectedData[] {
  const { initialCashBalance, monthlyIncome, payRoll, nonPayRoll } = userInput;
  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);
  const projectedData: ProjectedData[] = [];

  let cashBalance = initialCashBalance;
  for (let i = 1; i <= months; i++) {
    const revenue = calculateProjectedRevenue(userInput, i)[0].revenue;
    cashBalance -= totalBurnRate;
    projectedData.push({
      month: i,
      revenue: Number(revenue),
      cashBalance: cashBalance.toFixed(2)
    });
  }

  return projectedData;
}