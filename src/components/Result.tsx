import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store";
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';

const MyComponent = () => {
  const { 
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
    validationErrors,
    setField 
  } = useInputStore();

  interface ProjectedRevenue {
    month: number;
    revenue: string;
  }

  const [runway, setRunway] = useState<number>(0);
  const [projectedRevenue, setProjectedRevenue] = useState<ProjectedRevenue[]>([]);

  useEffect(() => {
    // Calculate runway and projected revenue whenever the input values change
    const userInput: InputStoreState = { 
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
    };
    const calculatedRunway = calculateRunway(userInput);
    const calculatedProjectedRevenue = calculateProjectedRevenue(userInput, 12);
    
    setRunway(calculatedRunway.runway);
    setProjectedRevenue(calculatedProjectedRevenue);
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

  const chartData = {
    labels: ['Runway (Months)'],
    datasets: [
      {
        label: 'Startup Runway',
        data: [runway],
        backgroundColor: 'rgba(19, 33, 60, 1)',
        borderColor: 'rgba(255, 215, 0, 1)',
      },
      {
        label: 'Projected Monthly Revenue',
        data: projectedRevenue.map((data) => Number(data.revenue)), 
        backgroundColor: 'rgba(250, 180, 70, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
      {Object.values(validationErrors).map((error, index) => (
        <p key={index} style={{ color: 'red' }}>{error}</p>
      ))}
      <p>Estimated Runway: {runway} months</p>
      <BarChart datasets={chartData.datasets} labels={chartData.labels} />
    </>
  );
};

export default MyComponent;
