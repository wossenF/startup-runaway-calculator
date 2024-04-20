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
    const MonthlyCashSales = monthlyIncome+ (monthlyIncome*monthlyGrowthRate )
    const  MonthlyExpenses =cogsPercentage*MonthlyCashSales + payRoll + nonPayRoll - 
    (monthlyCompensation * newHiresTimeline) - ( nonPayrollReduction *nonPayrollReductionTimeline )
    const totalBurnRate  = MonthlyExpenses - (fundraisingAmount/ fundraisingTimeline)
    
  if (totalBurnRate <= 0) {
    return { runway: Infinity, monthsRemaining: "∞" };
  }
  
  const runwayMonths = Math.ceil( ((initialCashBalance+fundraisingAmount ) / totalBurnRate ) );
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
  const MonthlyCashSales = monthlyIncome+ (monthlyIncome*monthlyGrowthRate )
  const  MonthlyExpenses =cogsPercentage*MonthlyCashSales + payRoll + nonPayRoll - 
  (monthlyCompensation * newHiresTimeline) - ( nonPayrollReduction *nonPayrollReductionTimeline )
  const totalBurnRate  = MonthlyExpenses - (fundraisingAmount/ fundraisingTimeline)

  for (let month = 1; month <= 6; month++) {
    const growth = monthlyGrowthRate/100 ;
    currentCashBalance -= MonthlyExpenses;
    const revenue = monthlyIncome + (monthlyIncome * growth);
  currentRevenue += revenue;
    projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) });
  }

  return projectedRevenue;
}