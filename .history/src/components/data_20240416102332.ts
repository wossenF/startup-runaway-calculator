import useInputStore from "@/store/store";

export default function RunawayCalculator({
  initialCashBalance,
  monthlyIncome,
  monthlyGrowthRate,
  cogsPercentage,
  payRoll,
  nonPayRoll,
  fundraisingAmount,
  monthlyCompensation,
  nonPayrollReduction,
  fundraisingTimeline
}) {
  let cashBalance = initialCashBalance || 0;
  let runwayMonths = 0;
  const maxMonths = 1000; // Maximum number of months to prevent infinite loop

  while (cashBalance > 0 && runwayMonths < maxMonths) {
    // Calculate monthly revenue
    let monthlyRevenue = monthlyIncome * (1 + monthlyGrowthRate / 100);

    // Calculate gross profit
    let grossProfit = monthlyRevenue - monthlyRevenue * (cogsPercentage / 100);

    // Calculate net income
    let netIncome = grossProfit - (payRoll + nonPayRoll);

    // Update cash balance
    cashBalance += netIncome;
    cashBalance += fundraisingAmount; // Assuming fundraising adds cash
    cashBalance -= monthlyCompensation; // Assuming monthly hiring costs
    cashBalance -= nonPayrollReduction; // Assuming reduction in non-payroll expenses

    // Move to the next month
    runwayMonths++;

    if (fundraisingTimeline && runwayMonths >= fundraisingTimeline) {
      // End calculation after fundraising timeline
      break;
    }
  }

  return runwayMonths;
}

