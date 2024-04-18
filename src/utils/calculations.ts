import { InputStoreState } from '../store/store';

export function calculateRunway(userInput: InputStoreState): { runway: number; monthsRemaining: number | string } {
  const { initialCashBalance, payRoll, nonPayRoll } = userInput;
  const totalBurnRate = payRoll + nonPayRoll;

  if (totalBurnRate <= 0) {
    return { runway: Infinity, monthsRemaining: "∞" };
  }

  const runwayMonths = Math.ceil(initialCashBalance / totalBurnRate);
  const monthsRemaining = Math.ceil(runwayMonths);

  return { runway: runwayMonths, monthsRemaining };
}

export function calculateProjectedRevenue(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
  const { monthlyIncome, monthlyGrowthRate } = userInput;
  const growthRateDecimal = monthlyGrowthRate / 100;

  const projectedRevenue: { month: number; revenue: string }[] = [];
  let currentRevenue = monthlyIncome;
  for (let month = 1; month <= months; month++) {
    const growthAmount = currentRevenue * growthRateDecimal;
    currentRevenue += growthAmount;
    projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) });
  }

  return projectedRevenue;
}
