import useInputStore, { InputStoreState } from "../store/store";

// Updated calculateRunway function
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

  // Calculate the accumulated profit for each month
  const firstMonthProfit = firstMonthBalance - firstMonthexpense;
  const secondMonthProfit = secondMonthBalance - secondMonthexpense;
  const thirdMonthProfit = thirdMonthBalance - thirdMonthexpense;




  // Calculate the burn rate based on the formula
  let burnRate =(firstMonthProfit + secondMonthProfit + thirdMonthProfit)/3;
  // console.log(burnRate)
  let runwayMonths=0;
  if(burnRate<0){
    // Calculate the runway months
    burnRate=(-1)*(burnRate)
    runwayMonths = Math.ceil(initialCashBalance/burnRate);
  }

  else{
    runwayMonths=0;
  }
// console.log(runwayMonths)
  // Calculate the runway months
  // const runwayMonths = Math.ceil(initialCashBalance / burnRate);
  
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

  const IncomegrowthRateDecimal = (thirdMonthBalance / firstMonthBalance)**(1/3)-1;
  const expensesgrowthRateDecimal = thirdMonthexpense / firstMonthexpense;

  // Calculate and store the current cash balance for 6 months
let eachmonthsData =[];
  const currentCashBalanceData = [];
  let eachmonthsExpenseData =[];
  // let eachmonthsIncome: number = 0;
  let eachmonthsIncome = firstMonthBalance;
  let eachmonthsExpense=firstMonthexpense;
  
  for (let i = 0; i < 6; i++) {
    const currentMonth = i;
    const currentMonthBalance =
      initialCashBalance - burnRate * currentMonth;
    currentCashBalanceData.push(currentMonthBalance);
    eachmonthsIncome = eachmonthsIncome + eachmonthsIncome * IncomegrowthRateDecimal;
    eachmonthsData.push(eachmonthsIncome);
    eachmonthsExpense = eachmonthsExpense + eachmonthsExpense * expensesgrowthRateDecimal;
    eachmonthsExpenseData.push(eachmonthsExpense);
  }

  // Update the store with the calculation results
  useInputStore.setState({
    runway: runwayMonths,
    monthsRemaining,
    totalBurnRate: burnRate,
    IncomegrowthRateDecimal,
    expensesgrowthRateDecimal,
    eachmonthsIncome: eachmonthsData.toString(),
    currentCashBalance: currentCashBalanceData.toString(),
    eachmonthsExpense:  eachmonthsExpenseData.toString(),
  });
}

