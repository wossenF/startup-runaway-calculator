import  InputStoreState  from '../store/store';
function calculateRunway(userInput: typeof InputStoreState): string | number {
  const { initialCashBalance, payRoll, nonPayRoll } = userInput;
  const totalBurnRate = payRoll + nonPayRoll;

  if (totalBurnRate <= 0) {
    return Infinity; 
  }

  const runwayMonths = initialCashBalance / totalBurnRate;
  return runwayMonths.toFixed(2); 
}

function calculateProjectedRevenue(userInput: InputStoreState, months: number): { month: number; revenue: string }[] {
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
