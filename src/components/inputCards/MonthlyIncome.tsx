import useInputStore from "@/store/store";
import React, { useState } from "react";
import { addMonths } from "date-fns";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function MonthlyIncome({
  monthlyDates,
  setMonthlyDates,
}: {
  monthlyDates: any[];
  setMonthlyDates: any;
}) {
  // const setField = useInputStore((state) => state.setField);
  const firstMonthBalance = useInputStore((state) => state.firstMonthBalance);
  const secondMonthBalance = useInputStore((state) => state.secondMonthBalance);
  const thirdMonthBalance = useInputStore((state) => state.thirdMonthBalance);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [thirdValue, setThirdValue] = useState("");

  const onChange = useInputStore((state) => state.onChange);

  const handleFirstIncomeChange = (e: any) => {
    const firstIncomeValue = e.target.value;
    onChange("firstMonthBalance", firstIncomeValue);
    setFirstValue(firstIncomeValue);
  };

  const handleSecondIncomeChange = (e: any) => {
    const secondBalanceValue = e.target.value;
    onChange("secondMonthBalance", secondBalanceValue);
    setSecondValue(secondBalanceValue);
  };
  const handleThirdIncomeChange = (e: any) => {
    const thirdBalanceValue = e.target.value;
    onChange("thirdMonthBalance", thirdBalanceValue);
    setThirdValue(thirdBalanceValue);
  };

  const handleFirstInputChange = (e: any) => {
    const value = e.target.value;

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
      <Label className="font-medium  text-xl pb-5 ">Monthly Income</Label>
      <div className="income  gap-4 flex rounded-lg ">
        <form className="monthly-income grid w-full gap-2">
          <Label className="">Months</Label>
          {[1, 2, 3].map((month) => (
            <React.Fragment key={month}>
              <Input
                className="w-full"
                type="date"
                name={`monthlyIncome${month}`}
                placeholder={month === 1 ? "Enter Date" : ""}
                value={monthlyDates[month - 1] || ""} // Provide a default value of an empty string
                onChange={handleFirstInputChange}
              />
            </React.Fragment>
          ))}
        </form>

        <form className="growth-rate w-full grid gap-2 ">
          <Label>monthly Balance</Label>
          <Input
            name="name"
            placeholder="Current Balance"
            onChange={handleFirstIncomeChange}
            value={firstValue || firstMonthBalance}
          />
          {/* {firsterror && <p className="text-red-500 text-sm">{firsterror}</p>} */}

          <Input
            name="name"
            // value={secondMonthBalance || ""}
            placeholder="Current Balance"
            onChange={handleSecondIncomeChange}
            value={secondValue || secondMonthBalance}
          />

          <Input
            name="name"
            // value={thirdMonthBalance || ""}
            placeholder="Current Balance"
            onChange={handleThirdIncomeChange}
            value={thirdValue || thirdMonthBalance}
          />
        </form>
      </div>
    </div>
  );
}

export default MonthlyIncome;
