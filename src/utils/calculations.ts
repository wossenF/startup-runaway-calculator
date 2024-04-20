import { InputStoreState } from '../store/store';
import React from 'react';

export function calculateRunway(userInput: InputStoreState): { runway: number; monthsRemaining: number | string } {
  const { initialCashBalance, payRoll, nonPayRoll, monthlyIncome, monthlyGrowthRate,
    cogsPercentage,
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline,
    newHiresTimeline,
    validationErrors: {}, } = userInput;
  
  const totalBurnRate = payRoll + nonPayRoll + (monthlyCompensation * newHiresTimeline) + 
    (nonPayrollReduction * nonPayrollReductionTimeline) + (cogsPercentage * monthlyIncome);

  if (totalBurnRate <= 0) {
    return { runway: Infinity, monthsRemaining: "∞" };
  }
  
  const runwayMonths = Math.ceil((initialCashBalance + fundraisingAmount) / ((totalBurnRate - nonPayrollReduction) - monthlyIncome));
  const monthsRemaining = Math.ceil(runwayMonths);

  return { runway: runwayMonths, monthsRemaining };
}

export function calculateProjectedRevenue(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
  const { initialCashBalance, monthlyIncome, monthlyGrowthRate, payRoll, nonPayRoll,
    cogsPercentage,
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline,
    newHiresTimeline, } = userInput;
  
  const projectedRevenue: { month: number; revenue: string }[] = [];
  let currentRevenue = monthlyIncome;
  let currentCashBalance = initialCashBalance;
  const totalBurnRate = payRoll + nonPayRoll + (monthlyCompensation * newHiresTimeline) + 
    (nonPayrollReduction * nonPayrollReductionTimeline) + (cogsPercentage * monthlyIncome);

  for (let month = 1; month <= months; month++) {
    currentCashBalance -= totalBurnRate;
    let growth =monthlyGrowthRate /100;
    const revenue = monthlyIncome + (monthlyIncome * growth);
    currentRevenue += revenue;
    projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) });
  }

  return projectedRevenue;
}