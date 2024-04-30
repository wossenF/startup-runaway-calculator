import useInputStore, { InputStoreState } from "../store/store";

export function calculateRunway(userInput: InputStoreState): void {
  const {
    initialCashBalance,
    firstMonthBalance,
    secondMonthBalance,
    thirdMonthBalance,
    firstMonthexpense,
    secondMonthexpense,
    thirdMonthexpense,
  } = userInput;

  const calculateProfit = (balance: string, expense: string) =>
    parseFloat(balance) - parseFloat(expense);
  const calculateGrowthRate = (current: string, initial: string) =>
    (parseFloat(current) / parseFloat(initial)) ** (1 / 3) - 1;

  const profitFirstMonth = calculateProfit(
    firstMonthBalance,
    firstMonthexpense
  );
  const profitSecondMonth = calculateProfit(
    secondMonthBalance,
    secondMonthexpense
  );
  const profitThirdMonth = calculateProfit(
    thirdMonthBalance,
    thirdMonthexpense
  );

  let burnRate = (profitFirstMonth + profitSecondMonth + profitThirdMonth) / 3;
  let runwayMonths =
    burnRate < 0 ? Math.ceil((initialCashBalance) / -burnRate) : 0;

  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + runwayMonths)
  );
  const monthsRemaining = Math.floor(
    (futureDate.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24 * 30.44)
  );

  const IncomegrowthRateDecimal = calculateGrowthRate(
    thirdMonthBalance,
    firstMonthBalance
  );
  const expensesgrowthRateDecimal = calculateGrowthRate(
    thirdMonthexpense,
    firstMonthexpense
  );

  const eachmonthsIncomeData = [],
    currentCashBalanceData = [],
    eachmonthsExpenseData = [],
    eachMonthProfitDate = [];
  let eachmonthsIncome = parseFloat(firstMonthBalance),
    eachmonthsExpense = parseFloat(firstMonthexpense);

  for (let i = 0; i < 6; i++) {
    currentCashBalanceData.push((initialCashBalance) - burnRate * i);
    eachmonthsIncome = eachmonthsIncome * (1 + IncomegrowthRateDecimal);
    eachmonthsIncomeData.push(eachmonthsIncome);
    eachmonthsExpense = eachmonthsExpense * (1 + expensesgrowthRateDecimal);
    eachmonthsExpenseData.push(eachmonthsExpense);
    eachMonthProfitDate.push(eachmonthsIncome - eachmonthsExpense);
  }

  useInputStore.setState({
    runway: runwayMonths,
    monthsRemaining,
    totalBurnRate: burnRate,
    IncomegrowthRateDecimal,
    expensesgrowthRateDecimal,
    eachmonthsIncome: eachmonthsIncomeData.join(),
    currentCashBalance: currentCashBalanceData.join(),
    eachmonthsExpense: eachmonthsExpenseData.join(),
    eachmonthsProfit: eachMonthProfitDate.join(),
  });
}
