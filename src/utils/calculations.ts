
import { InputStoreState } from '../store/store';

export function calculateRunway(userInput: InputStoreState): { runway: number; monthsRemaining: number | string } {
  const { initialCashBalance, payRoll, nonPayRoll, monthlyIncome, monthlyGrowthRate, cogsPercentage, fundraisingAmount, monthlyCompensation, nonPayrollReduction, nonPayrollReductionTimeline, fundraisingTimeline, newHiresTimeline } = userInput;

  // Check if all optional inputs exist
  if (cogsPercentage !== undefined && fundraisingAmount !== undefined && monthlyCompensation !== undefined && nonPayrollReduction !== undefined && nonPayrollReductionTimeline !== undefined && fundraisingTimeline !== undefined && newHiresTimeline !== undefined) {
    // Use the existing calculateRunway function
    return calculateRunwayFull(userInput);
  } else {
    // Use the simplified version of the function
    const totalBurnRate = payRoll + nonPayRoll;
    if (totalBurnRate <= 0) {
      return { runway: Infinity, monthsRemaining: "∞" };
    }
    const runwayMonths = Math.ceil(initialCashBalance / totalBurnRate);
    const monthsRemaining = Math.ceil(runwayMonths);
    return { runway: runwayMonths, monthsRemaining };
  }
}

export function calculateProjectedRevenue(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
  const { initialCashBalance, monthlyIncome, monthlyGrowthRate, payRoll, nonPayRoll, newHiresTimeline, cogsPercentage, fundraisingAmount, monthlyCompensation, nonPayrollReduction, nonPayrollReductionTimeline, fundraisingTimeline } = userInput;

  // Check if all optional inputs exist
  if (cogsPercentage !== undefined && fundraisingAmount !== undefined && monthlyCompensation !== undefined && nonPayrollReduction !== undefined && nonPayrollReductionTimeline !== undefined && fundraisingTimeline !== undefined && newHiresTimeline !== undefined) {
    // Use the existing calculateProjectedRevenue function
    return calculateProjectedRevenueFull(userInput, months);
  } else {
    // Use the simplified version of the function
    const growthRateDecimal = monthlyGrowthRate / 100;
    const totalBurnRate = payRoll + nonPayRoll;
    const projectedRevenue: { month: number; revenue: string }[] = [];
    let currentRevenue = monthlyIncome;
    let currentCashBalance = initialCashBalance;

    for (let month = 1; month <= months; month++) {
      currentCashBalance -= totalBurnRate;
      const growthAmount = currentRevenue * growthRateDecimal;
      currentRevenue += growthAmount;
      projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) });
    }

    return projectedRevenue;
  }
}

// Existing calculateRunway function
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
