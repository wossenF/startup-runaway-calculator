import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useInputStore from "@/store/store"
import { useEffect, useState } from "react"

export default function TableResult() {
  const {
    currentCashBalance,
    eachmonthsIncome,
    eachmonthsExpense,
  } = useInputStore();

  const [Result, setResult] = useState([]);

  useEffect(() => {
    if (currentCashBalance && eachmonthsIncome && eachmonthsExpense) {
      const cashBalances = currentCashBalance.split(",").map(Number);
      const monthlyIncomes = eachmonthsIncome.split(",").map(Number);
      const monthlyExpenses = eachmonthsExpense.split(",").map(Number);

      const result = cashBalances.map((cashBalance, index) => ({
        month: index + 1,
        cashBalance: cashBalance.toFixed(2),
        salesIncome: monthlyIncomes[index].toFixed(2),
        totalAmount: monthlyExpenses[index].toFixed(2),
      }));

      setResult(result);
    }
  }, [currentCashBalance, eachmonthsIncome, eachmonthsExpense]);

  return (
    <Table className="my-3">
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Current Cash Balance</TableHead>
          <TableHead>Monthly Income</TableHead>
          <TableHead className="text-right">Monthly Expense</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Result.map((result) => (
          <TableRow key={result.month}>
            <TableCell>{result.month}</TableCell>
            <TableCell className="font-medium">${result.cashBalance}</TableCell>
            <TableCell>${result.salesIncome}</TableCell>
            <TableCell className="text-right">${result.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            ${Result.reduce((acc, curr) => acc + parseFloat(curr.totalAmount), 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
