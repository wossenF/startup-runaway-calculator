import useInputStore from "@/store/store";
import React, { useState, useEffect } from "react";
import { addMonths, startOfMonth, endOfMonth } from "date-fns";
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

  const [firstValueError, setFirstValueError] = useState(false);
  const [secondValueError, setSecondValueError] = useState(false);
  const [thirdValueError, setThirdValueError] = useState(false);

  const onChange = useInputStore((state) => state.onChange);

  useEffect(() => {
    // Initialize monthly dates with current month and the previous two months
    const currentDate = new Date();
    const currentMonth = startOfMonth(currentDate);
    const previousMonth = startOfMonth(addMonths(currentMonth, +1));
    const twoMonthsAgo = startOfMonth(addMonths(currentMonth, 2));

    setMonthlyDates([currentMonth.toISOString().split("T")[0], previousMonth.toISOString().split("T")[0], twoMonthsAgo.toISOString().split("T")[0]]);

    // Set initial values for income inputs
    setFirstValue(firstMonthexpense);
    setSecondValue(secondMonthexpense);
    setThirdValue(thirdMonthexpense);
  }, []);

  const handleFirstExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstExpenseValue = e.target.value;
    onChange("firstMonthexpense", firstExpenseValue);
    setFirstValue(firstExpenseValue);
    setFirstValueError(firstExpenseValue.trim() === "");
  };

  const handleSecondExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const secondExpenseValue = e.target.value;
    onChange("secondMonthexpense", secondExpenseValue);
    setSecondValue(secondExpenseValue);
    setSecondValueError(secondExpenseValue.trim() === "");
  };

  const handleThirdExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thirdExpenseValue = e.target.value;
    onChange("thirdMonthexpense", thirdExpenseValue);
    setThirdValue(thirdExpenseValue);
    setThirdValueError(thirdExpenseValue.trim() === "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Label className="font-medium text-xl">Monthly Expenditure</Label>
      <div className="income gap-4 flex rounded-lg">
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
          <Label>Monthly expense</Label>
          <div>
            <Input
              type="number"
              placeholder="Expense"
              onChange={handleFirstExpenseChange}
              value={firstValue}
              disabled={!monthlyDates[0]}
            />
            {firstValueError && <p className="text-red-500 text-sm">insert value for this month income.</p>}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Expense"
              onChange={handleSecondExpenseChange}
              value={secondValue}
              disabled={!monthlyDates[1]}
            />
            {secondValueError && <p className="text-red-500 text-sm">insert value for this month income.</p>}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Expense"
              onChange={handleThirdExpenseChange}
              value={thirdValue}
              disabled={!monthlyDates[2]}
            />
            {thirdValueError && <p className="text-red-500 text-sm">insert value for this month income.</p>}
          </div>
        </form>
      </div>

      {!monthlyDates[0] && !monthlyDates[1] && !monthlyDates[2] &&  <p className="text-red-500 text-sm">Please fill in the date for the first month.</p>}

    </div>
  );
}

export default MonthlyExpenditure;