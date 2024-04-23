


import { InputStoreState } from '../store/store';

export function calculateRunway(userInput: InputStoreState): { runway: number; monthsRemaining: number | string } {
  const { cogsPercentage, fundraisingAmount, monthlyCompensation, nonPayrollReduction, nonPayrollReductionTimeline, fundraisingTimeline, newHiresTimeline } = userInput;

  if (cogsPercentage !== undefined && fundraisingAmount !== undefined && monthlyCompensation !== undefined && nonPayrollReduction !== undefined && nonPayrollReductionTimeline !== undefined && fundraisingTimeline !== undefined && newHiresTimeline !== undefined) {
    return calculateRunwayFull(userInput);
  } else {
    return calculateRunwaySimplified(userInput);
  }
}

export function calculateProjectedRevenue(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
  const {cogsPercentage, fundraisingAmount, monthlyCompensation, nonPayrollReduction, nonPayrollReductionTimeline, fundraisingTimeline, newHiresTimeline } = userInput;

  if (cogsPercentage !== undefined && fundraisingAmount !== undefined && monthlyCompensation !== undefined && nonPayrollReduction !== undefined && nonPayrollReductionTimeline !== undefined && fundraisingTimeline !== undefined && newHiresTimeline !== undefined) {
    return calculateProjectedRevenueFull(userInput, months);
  } else {
    return calculateProjectedRevenueSimplified(userInput, months);
  }
}
function calculateRunwayFull(userInput: InputStoreState): { runway: number; monthsRemaining: number | string } {
  const { initialCashBalance, payRoll, nonPayRoll, monthlyIncome,
    currentCashBalance,
 
     monthlyGrowthRate,
     cogsPercentage,
   
     fundraisingAmount,
     monthlyCompensation,
     nonPayrollReduction,
     nonPayrollReductionTimeline,
     fundraisingTimeline,
     newHiresTimeline, } = userInput;
  const totalBurnRate =  payRoll + nonPayRoll + (monthlyCompensation * newHiresTimeline) + (nonPayrollReduction * nonPayrollReductionTimeline) 
  + (cogsPercentage * monthlyIncome)

  if (totalBurnRate <= 0) {
    return { runway: Infinity, monthsRemaining: "∞" };
  }

  const runwayMonths = Math.ceil( (initialCashBalance + fundraisingAmount) /
   ((totalBurnRate - nonPayrollReduction) - monthlyIncome - (monthlyIncome * fundraisingTimeline)));
  const monthsRemaining = Math.ceil(runwayMonths);

  return { runway: runwayMonths, monthsRemaining };
}
// Existing calculateProjectedRevenue function
function calculateProjectedRevenueFull(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
  const { initialCashBalance, monthlyIncome, monthlyGrowthRate, payRoll, nonPayRoll, newHiresTimeline, 

    cogsPercentage,
  
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline, } = userInput;
  const growthRateDecimal = monthlyGrowthRate / 100;
  const totalBurnRate =  payRoll + nonPayRoll + (monthlyCompensation * newHiresTimeline) + (nonPayrollReduction * nonPayrollReductionTimeline) 
  + (cogsPercentage * monthlyIncome)

  const projectedRevenue: { month: number; revenue: string }[] = [];
  let currentRevenue = monthlyIncome;
  let currentCashBalance = initialCashBalance;

  for (let month = 1; month <= 6; month++) {
    
    currentCashBalance -= totalBurnRate ;
    const growthAmount = monthlyIncome + (monthlyIncome * growthRateDecimal) ;
    currentRevenue += growthAmount;
    projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) });
  }

  return projectedRevenue;
}

function calculateRunwaySimplified(userInput: InputStoreState): { runway: number; monthsRemaining: number | string } {
  const { initialCashBalance, payRoll, nonPayRoll, monthlyIncome } = userInput;
  const totalBurnRate = payRoll + nonPayRoll;

  if (totalBurnRate <= 0) {
    return { runway: Infinity, monthsRemaining: "∞" };
  }

  const runwayMonths = Math.ceil(initialCashBalance / totalBurnRate);
  const monthsRemaining = Math.ceil(runwayMonths);

  return { runway: runwayMonths, monthsRemaining };
}

function calculateProjectedRevenueSimplified(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
  const { initialCashBalance, monthlyIncome, monthlyGrowthRate, payRoll, nonPayRoll } = userInput;
  const growthRateDecimal = monthlyGrowthRate / 100;
  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);
  const projectedRevenue: { month: number; revenue: string }[] = [];
  let currentRevenue = monthlyIncome;

  for (let month = 1; month <= months; month++) {
    currentRevenue += currentRevenue * growthRateDecimal;
    projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) });
  }

  return projectedRevenue;
}
