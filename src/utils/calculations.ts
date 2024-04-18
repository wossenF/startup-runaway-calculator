import { InputStoreState } from '../store/store';
import React from 'react';

export function calculateRunway(userInput: InputStoreState): { runway: number; monthsRemaining: number | string } {
  const { initialCashBalance, payRoll, nonPayRoll, monthlyIncome } = userInput;
  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);

  if (totalBurnRate <= 0) {
    return { runway: Infinity, monthsRemaining: "∞" };
  }

  const runwayMonths = Math.ceil(initialCashBalance / totalBurnRate);
  const monthsRemaining = Math.ceil(runwayMonths);

  return { runway: runwayMonths, monthsRemaining };
}

export function calculateProjectedRevenue(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
  const { initialCashBalance, monthlyIncome, monthlyGrowthRate, payRoll, nonPayRoll } = userInput;
  const growthRateDecimal = monthlyGrowthRate / 100;
  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);
  const projectedRevenue: { month: number; revenue: string }[] = [];
  let currentRevenue = monthlyIncome;
  let currentCashBalance = initialCashBalance;

  for (let month = 1; month <= 6; month++) {
    
    currentCashBalance -= totalBurnRate * month;
    const growthAmount = currentRevenue * growthRateDecimal;
    currentRevenue += growthAmount;
    projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) });
  }

  return projectedRevenue;
}