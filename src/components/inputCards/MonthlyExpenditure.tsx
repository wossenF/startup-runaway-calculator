import useInputStore from "@/store/store";
import React, { useState } from "react";
import { addMonths } from "date-fns";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function MonthlyExpenditure({
  monthlyDates,
  setMonthlyDates,
}: {
  monthlyDates: any[];
  setMonthlyDates: any;
}) {
  const firstMonthexpense = useInputStore((state) => state.firstMonthexpense);
  const secondMonthexpense = useInputStore((state) => state.secondMonthexpense);
  const thirdMonthexpense = useInputStore((state) => state.thirdMonthexpense);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [thirdValue, setThirdValue] = useState("");

  const onChange = useInputStore((state) => state.onChange);

  const handleFirstExpenseChange = (e: any) => {
    const firstExpenseValue = e.target.value;
    onChange("firstMonthexpense", firstExpenseValue);
    setFirstValue(firstExpenseValue);
  };

  const handleSecondExpenseChange = (e: any) => {
    const secondExpenseValue = e.target.value;
    onChange("secondMonthexpense", secondExpenseValue);
    setSecondValue(secondExpenseValue);
  };

  const handleThirdExpenseChange = (e: any) => {
    const thirdExpenseValue = e.target.value;
    onChange("thirdMonthexpense", thirdExpenseValue);
    setThirdValue(thirdExpenseValue);
  };

  const handleInputChange = (e: any) => {
    const monthvalue = e.target.value;

    setMonthlyDates([monthvalue, null, null]);

    if (isNaN(Date.parse(e.target.value))) {
      console.error("Invalid date format. Please enter a valid date.");
      return;
    }

    const firstMonthDate = new Date(monthvalue);
    for (let index = 1; index < 3; index++) {
      const nextMonth = addMonths(firstMonthDate, index);
      setMonthlyDates((prevDates: any[]) => [
        ...prevDates.slice(0, index),
        nextMonth.toISOString().split("T")[0],
      ]);
    }
  };

  return (
    <div className="bg-secondary/50 rounded-lg p-7 grid gap-2">
      <Label className="font-medium  text-xl">Monthly Expenditure</Label>
      <div className="income  gap-4 flex rounded-lg ">
        <form className="monthly-income grid w-full gap-2 relative">
          <Label className="">Months</Label>
          {[1, 2, 3].map((month) => (
            <React.Fragment key={month}>
              <Input
                className="expenditure w-full"
                type="date"
                name={`monthlyExpenditure${month}`}
                placeholder={month === 1 ? "Enter Date" : ""}
                value={monthlyDates[month - 1] || ""}
                onChange={handleInputChange}
              />
            </React.Fragment>
          ))}
        </form>

        <form className="growth-rate w-full grid gap-2">
          <Label>monthly expense</Label>
          <Input
            type="number"
            name="name"
            placeholder="expense"
            onChange={handleFirstExpenseChange}
            value={firstValue || firstMonthexpense}
            disabled={!monthlyDates[0]} // Disable if first date not filled
          />

          <Input
            name="name"
            type="number"
            placeholder="expense"
            onChange={handleSecondExpenseChange}
            value={secondValue || secondMonthexpense}
            disabled={!monthlyDates[1]} // Disable if second date not filled
          />

          <Input
            name="name"
            type="number"
            placeholder="expense"
            onChange={handleThirdExpenseChange}
            value={thirdValue || thirdMonthexpense}
            disabled={!monthlyDates[2]} // Disable if third date not filled
          />
        </form>
      </div>
      {!monthlyDates[0] && (
        <p className="text-red-500 text-sm">Please fill date</p>
      )}
      {monthlyDates[0] &&
        !firstMonthexpense &&
        monthlyDates[1] &&
        !secondMonthexpense &&
        monthlyDates[2] &&
        !thirdMonthexpense && (
          <p className="text-red-500 flex justify-end text-sm">
            Please fill current month expense(Number)
          </p>
        )}
    </div>
  );
}

export default MonthlyExpenditure;
