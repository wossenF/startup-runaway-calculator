/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store";
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';

const FinalResult = () => {
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

  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);

  const chartData = {
    labels: projectedRevenue.map(data => `Month ${data.month}`),
    datasets: [
      {
        label: 'Projected Monthly Revenue',
        data: projectedRevenue.map(data => Number(data.revenue)),
        backgroundColor: 'rgba(19, 33, 60, 1)',
        borderColor: 'rgba(19, 33, 60, 1)',
      },
      {
        label: 'Current Cash Balance',
        data: projectedRevenue.map((data, index) => {
          const cashBalance = initialCashBalance - (totalBurnRate * index);
          return cashBalance.toFixed(2);
        }),
        type: 'bar',
        fill: false,
        backgroundColor: 'rgba(250, 180, 70, 1)',
        borderColor: 'rgba(250, 180, 70, 1)',
      },
    ],
  };


  return (
    <div className="my-1">
      <input
        type="number"
        name="initialCashBalance"
        value={initialCashBalance}
        onChange={(e) => setField("initialCashBalance", parseInt(e.target.value))}

      />
      {Object.values(validationErrors).map((error, index) => (
        <p key={index} style={{ color: 'red' }}>{error}</p>
      ))}
      <p>Estimated Runway: {runway} months</p>
      <BarChart datasets={chartData.datasets} labels={chartData.labels} />
    </div>
  );
};

export default FinalResult;