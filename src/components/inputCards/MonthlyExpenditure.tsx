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
  const [inputValue, setInputValue] = useState("");
  const error = useInputStore((state) => state.error);
  // const setField = useInputStore((state) => state.setField);
  const firstMonthexpense = useInputStore((state) => state.firstMonthexpense);
  const secondMonthexpense = useInputStore((state) => state.secondMonthexpense);
  const thirdMonthexpense = useInputStore((state) => state.thirdMonthexpense);
  const onChange = useInputStore((state) => state.onChange);

  const handleFirstInputChange = (e: any) => {
    const value = e.target.value;
    onChange("initialCashBalance", value);
    setInputValue(value);

    setMonthlyDates([value, null, null]);

    if (isNaN(Date.parse(e.target.value))) {
      console.error("Invalid date format. Please enter a valid date.");
      return;
    }

    const firstMonthDate = new Date(value);
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
                onChange={handleFirstInputChange}
              />
            </React.Fragment>
          ))}
        </form>

        <form className="growth-rate w-full grid gap-2">
          <Label>monthly expenditure</Label>
          <p className="text-gray-500 text-sm">expense expense of each month</p>
          <Input
            name="name"
            value={firstMonthexpense || ""}
            placeholder="this month expenses"
            onChange={handleFirstInputChange}
          />

          <Input
            name="name"
            value={secondMonthexpense || ""}
            placeholder="this month expenses"
            // onChange={(e) => {
            //   setField("secondMonthexpense", parseFloat(e.target.value) || 0);
            //   //   calculateBurnRate();
            // }}
          />

          <Input
            name="name"
            value={thirdMonthexpense || ""}
            placeholder="this month expenses"
            // onChange={(e) => {
            //   setField("thirdMonthexpense", parseFloat(e.target.value) || 0);
            //   //   calculateBurnRate();
            // }}
          />
        </form>
      </div>
    </div>
  );
}

export default MonthlyExpenditure;
