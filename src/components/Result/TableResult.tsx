import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useInputStore, { InputStoreState } from "@/store/store";
import { useEffect, useState } from "react";

interface MonthlyData {
  currentCashBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  monthlyProfit: number;
}

export default function TableResult() {
  const {
    initialCashBalance,
    firstMonthBalance,
    secondMonthBalance,
    thirdMonthBalance,
    firstMonthexpense,
    secondMonthexpense,
    thirdMonthexpense,
    validationErrors,
    setField,
    currentCashBalance,
    runway,
    eachmonthsIncome,
    eachmonthsExpense,
  } = useInputStore();

  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const userInput: InputStoreState = {
      eachmonthsIncome: eachmonthsIncome,
      growthRate: 0,
      burnRate: 0,
      expenseRate: 0,
      initialCashBalance,
      firstMonthBalance,
      secondMonthBalance,
      thirdMonthBalance,
      firstMonthexpense,
      secondMonthexpense,
      thirdMonthexpense,
      validationErrors,
      currentCashBalance: "",
      error: "",
      runway: 0,
      monthsRemaining: "",
      totalBurnRate: 0,
      IncomegrowthRateDecimal: 0,
      expensesgrowthRateDecimal: 0,
      eachmonthsExpense: eachmonthsExpense,
    };

    const monthlyIncome = eachmonthsIncome.split(",").map((item) => parseFloat(item));
    const currentCash = currentCashBalance.split(",").map((item) => parseFloat(item));
    const monthlyExpense = eachmonthsExpense.split(",").map((item) => parseFloat(item));
    const monthlyProfit = monthlyIncome.map((income, index) => income - monthlyExpense[index]);

    const newMonthlyData: MonthlyData[] = monthlyData.map((result, index) => ({
      ...result,
      currentCashBalance: currentCash[index],
      monthlyIncome: monthlyIncome[index],
      monthlyExpense: monthlyExpense[index],
      monthlyProfit: monthlyProfit[index],
    }));

    setMonthlyData(newMonthlyData);
  }, [
    initialCashBalance,
    firstMonthBalance,
    secondMonthBalance,
    thirdMonthBalance,
    firstMonthexpense,
    secondMonthexpense,
    thirdMonthexpense,
    validationErrors,
    eachmonthsIncome,
    eachmonthsExpense,
  ]);

  return (
    <Table className="my-3">
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Current Cash Balance</TableHead>
          <TableHead>Monthly Income</TableHead>
          <TableHead>Monthly Expense</TableHead>
          <TableHead className="text-right">Monthly Profit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {monthlyData.map((result, index) => (
          <TableRow key={index + 1}>
            <TableCell>M-0{index + 1}</TableCell>
            <TableCell>${result.currentCashBalance}</TableCell>
            <TableCell>${result.monthlyIncome}</TableCell>
            <TableCell>${result.monthlyExpense}</TableCell>
            <TableCell className="text-right">
              ${result.monthlyProfit.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Calculate and display total profit */}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Profit</TableCell>
          <TableCell className="text-right">
            $
            {monthlyData
              .reduce((acc, curr) => acc + parseFloat(curr.monthlyProfit.toString()), 0)
              .toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}