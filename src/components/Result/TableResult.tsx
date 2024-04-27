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
    currentCashBalance,
    eachmonthsIncome,
    eachmonthsExpense,
  } = useInputStore();

  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([
    {
      currentCashBalance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
      monthlyProfit: 0,
    },
    {
      currentCashBalance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
      monthlyProfit: 0,
    },
    {
      currentCashBalance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
      monthlyProfit: 0,
    },
  ]);

  useEffect(() => {
    if (eachmonthsIncome && eachmonthsExpense && currentCashBalance) {
      const monthlyIncome = eachmonthsIncome.split(",").map((item) => parseFloat(item));
      const currentCash = currentCashBalance.split(",").map((item) => parseFloat(item));
      const monthlyExpense = eachmonthsExpense.split(",").map((item) => parseFloat(item));
      const monthlyProfit = monthlyIncome.map((income, index) => income - monthlyExpense[index]);
      const totalProfit = monthlyData.reduce((acc, curr) => acc + curr.monthlyProfit, 0);
      useInputStore.setState({ totalProfit });

      const newMonthlyData: MonthlyData[] = monthlyIncome.map((income, index) => ({
        currentCashBalance: currentCash[index],
        monthlyIncome: income,
        monthlyExpense: monthlyExpense[index],
        monthlyProfit: monthlyProfit[index],
      }));

      setMonthlyData(newMonthlyData);
    }
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
    currentCashBalance,
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
            <TableCell>${result.currentCashBalance.toFixed(2)}</TableCell>
            <TableCell>${result.monthlyIncome.toFixed(2)}</TableCell>
            <TableCell>${result.monthlyExpense.toFixed(2)}</TableCell>
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
