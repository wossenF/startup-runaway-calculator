import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store"; // Import InputStoreState
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';

const MyComponent = () => {
  // Destructure the state and functions from the useInputStore
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

  // Define states for runway and projected revenue
  const [runway, setRunway] = useState<number>(0);
  const [projectedRevenue, setProjectedRevenue] = useState<ProjectedRevenue[]>([]);

  useEffect(() => {
    // Calculate runway based on input values
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
      validationErrors // Include validationErrors property
    };
    const calculatedRunway = calculateRunway(userInput);
    const calculatedProjectedRevenue = calculateProjectedRevenue(userInput, 12);
    
    // Update state with calculated values
    setRunway(Number(calculatedRunway));
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
    validationErrors // Include validationErrors property in dependencies
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
        backgroundColor: 'rgba(250, 180, 70, 1)
        ',
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

export default MyComponent;