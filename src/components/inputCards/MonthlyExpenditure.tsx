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
  // const setField = useInputStore((state) => state.setField);
  const firstMonthexpense = useInputStore((state) => state.firstMonthexpense);
  const secondMonthexpense = useInputStore((state) => state.secondMonthexpense);
  const thirdMonthexpense = useInputStore((state) => state.thirdMonthexpense);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [thirdValue, setThirdValue] = useState("");
  
  const firsterror = useInputStore((state) => state.error);
  const seconderror = useInputStore((state) => state.error);
  const thirderror = useInputStore((state) => state.error);

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
        <form className="monthly-income grid w-full gap-2 ">
          <Label className="">Months</Label>
          <p className="text-gray-500 text-sm">Month</p>
          {[1, 2, 3].map((month) => (
            <React.Fragment key={month}>
              <Input
                className="w-full"
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
          <Label>monthly expenditure</Label>
          <p className="text-gray-500 text-sm">expense expense of each month</p>
          <Input
            name="name"
            placeholder="this month expenses"
            onChange={handleFirstExpenseChange}
            value={firstValue || firstMonthexpense}
          />
          {firsterror && <p className="text-red-500 text-sm">{firsterror}</p>}

          <Input
            name="name"
            placeholder="this month expenses"
           onChange={handleSecondExpenseChange}
            value={secondValue || secondMonthexpense}
          />
          {seconderror && <p className="text-red-500 text-sm">{seconderror}</p>}

          <Input
            name="name"
            placeholder="this month expenses"
            onChange={handleThirdExpenseChange}
            value={thirdValue || thirdMonthexpense}
          />
          {thirderror && <p className="text-red-500 text-sm">{thirderror}</p>}
        </form>
      </div>
    </div>
  );
}

export default MonthlyExpenditure;
