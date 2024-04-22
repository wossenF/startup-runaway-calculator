import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useInputStore,{InputStoreState} from "@/store/store"
import { useEffect, useState } from "react"

const Result = [
  {
    month: "M-01",
    cashBalance: "$3453",
    totalAmount: "$250.00",
    burnRate: "100",
    salesIncome: "$250.00",
  },
  {
    month: "M-02",
    cashBalance: "$3453",
    totalAmount: "$250.00",
    burnRate: "100",
    salesIncome: "$250.00",
  },
  {
    month: "M-03",
    cashBalance: "$3453",
    totalAmount: "$250.00",
    burnRate: "100",
    salesIncome: "$250.00",
  },
  {
    month: "M-04",
    cashBalance: "$3453",
    totalAmount: "$250.00",
    burnRate: "100",
    salesIncome: "$250.00",
  },
  {
    month: "M-05",
    cashBalance: "$3453",
    totalAmount: "$250.00",
    burnRate: "100",
    salesIncome: "$250.00",
  },
  {
    month: "M-06",
    cashBalance: "$3453",
    totalAmount: "$250.00",
    burnRate: "100",
    salesIncome: "$250.00",
  },

  
]

export default function TableResult() {
  
  const {
    initialCashBalance,
    monthlyIncome,
    monthlyGrowthRate,
    cogsPercentage,
    payRoll,
    nonPayRoll,
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline,
    newHiresTimeline,
    validationErrors,
    setField,
  } = useInputStore();

  const [projectedRevenue, setProjectedRevenue] = useState<
    { month: number; revenue: string }[]
  >([]);

  return (
    <Table className="my-3">
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Cash Balance</TableHead>
          <TableHead>Burn Rate</TableHead>
          <TableHead>Sales Income</TableHead>
          <TableHead className="text-right">monthlyRevenue</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {Result.map((result) => (
          <TableRow>
             <TableCell>{result.month}</TableCell>
            <TableCell className="font-medium">{result.cashBalance}</TableCell>
            <TableCell>{result.burnRate}</TableCell>
            <TableCell>{result.salesIncome}</TableCell>
            <TableCell className="text-right">{result.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
