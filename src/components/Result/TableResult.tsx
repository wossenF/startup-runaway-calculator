import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "M-01",
    paymentStatus: "$3453",
    totalAmount: "$250.00",
    paymentMethod: "10%",
    salesIncome: "$250.00",
  },
  {
    invoice: "M-02",
    paymentStatus: "$3453",
    totalAmount: "$250.00",
    paymentMethod: "10%",
    salesIncome: "$250.00",

  },
  {
    invoice: "M-03",
    paymentStatus: "$3453",
    totalAmount: "$250.00",
    paymentMethod: "10%",
    salesIncome: "$250.00",

  },
  {
    invoice: "M-04",
    paymentStatus: "$3453",
    totalAmount: "$250.00",
    paymentMethod: "10%",
    salesIncome: "$250.00",

  },
  {
    invoice: "M-05",
    paymentStatus: "$3453",
    totalAmount: "$250.00",
    paymentMethod: "10%",
    salesIncome: "$250.00",

  },
  {
    invoice: "M-06",
    paymentStatus: "$3453",
    totalAmount: "$250.00",
    paymentMethod: "10%",
    salesIncome: "$250.00",

  },
  
]

export default function TableResult() {
  return (
    <Table className="my-3">
      <TableHeader>
        <TableRow>
          <TableHead>Monthes</TableHead>
          <TableHead>Cash Balance</TableHead>
          <TableHead>Burn Rate</TableHead>
          <TableHead>Sales Income</TableHead>
          <TableHead className="text-right">monthlyRevenue</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.salesIncome}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
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
