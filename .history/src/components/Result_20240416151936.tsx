import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore from "../store/store"; 
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
  } = useInputStore(); // Destructure the state and functions from the useInputStore

  interface ProjectedRevenue {
    month: number;
    revenue: number;
  }

  // Define states for runway and projected revenue
  const [runway, setRunway] = useState<number>(0);
  const [projectedRevenue, setProjectedRevenue] = useState<ProjectedRevenue[]>([]);

  useEffect(() => {
    // Calculate runway based on input values
    const userInput = { 
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
      newHiresTimeline
    };
    const calculatedRunway = calculateRunway(userInput);
    const calculatedProjectedRevenue = calculateProjectedRevenue(userInput,12);
    
    // Update state with calculated values
    setRunway(Number(calculatedRunway) );
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
    newHiresTimeline
  ]);

  const chartData = {
    labels: ['Runway (Months)'],
    datasets: [
      {
        label: 'Startup Runway',
        data: [runway],
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderColor: 'rgba(255, 215, 0, 1)',
      },
      {
        data: projectedRevenue.map((data) => data.revenue),
        label: 'Projected Monthly Revenue',
    data: projectedRevenue.map((data) => Number(data.revenue)),
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
      <p>Estimated Runway: {runway} months</p>
      {/* Render the BarChart component */}
      <BarChart datasets={chartData.datasets} labels={chartData.labels} />
    </>
  );
};