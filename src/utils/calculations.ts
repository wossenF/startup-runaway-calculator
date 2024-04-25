import useInputStore, { InputStoreState } from "../store/store";

// Updated calculateRunway function
export function calculateRunway(userInput: InputStoreState): {
  runway: number;
  
} {
  const {
    initialCashBalance,
    firstMonthBalance,
    secondMonthBalance,
    thirdMonthBalance,
    firstMonthexpense,
    secondMonthexpense,
    thirdMonthexpense,
  } = userInput;

  // Calculate the accumulated profit for each month
  const firstMonthProfit = firstMonthBalance - firstMonthexpense;
  const secondMonthProfit = secondMonthBalance - secondMonthexpense;
  const thirdMonthProfit = thirdMonthBalance - thirdMonthexpense;

  // calculate sum profit
  const firstProfit = firstMonthProfit;
  const secondProfit = firstProfit + secondMonthProfit;
  const thirdProfit = secondProfit + thirdMonthProfit;

  // Calculate the third month accumulated profit
  const thirdMonthAccumulatedProfit = firstProfit + secondProfit + thirdProfit;

  // Calculate the burn rate based on the formula
  const burnRate =
    (((thirdMonthAccumulatedProfit / firstProfit) ** 0.5 - 1) / 3) *
    initialCashBalance;

  // Calculate the runway months
  const runwayMonths = Math.ceil(initialCashBalance / burnRate);
  console.log(runwayMonths);

  // Calculate the months remaining
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + runwayMonths)
  );
  const currentDateTimestamp = currentDate.getTime();
  const futureDateTimestamp = futureDate.getTime();
  const remainingMilliseconds = futureDateTimestamp - currentDateTimestamp;
  const millisecondsInAMonth = 1000 * 60 * 60 * 24 * 30.44; // average number of milliseconds in a month
  const monthsRemaining = Math.floor(
    remainingMilliseconds / millisecondsInAMonth
  );

  const IncomegrowthRateDecimal = thirdMonthBalance / firstMonthBalance;
  const expensesgrowthRateDecimal = thirdMonthexpense / firstMonthexpense;

  // Calculate and store the current cash balance for 6 months
  const currentCashBalanceData = [];
  for (let i = 0; i < 6; i++) {
    const currentMonth = i + 1;
    const currentMonthBalance = initialCashBalance - burnRate * currentMonth;
    currentCashBalanceData.push(currentMonthBalance);
  }

  // Update the store with the calculation results
  useInputStore.setState({
    runway: runwayMonths,
    monthsRemaining,
    totalBurnRate: burnRate,
    IncomegrowthRateDecimal,
    expensesgrowthRateDecimal,
    currentCashBalance: currentCashBalanceData.toString(),
  });
  return { runway: runwayMonths };
}
