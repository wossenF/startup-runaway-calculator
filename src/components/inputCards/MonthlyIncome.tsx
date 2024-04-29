import useInputStore from "@/store/store";
import React, { useState, useEffect } from "react";
import { addMonths, startOfMonth, endOfMonth } from "date-fns";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function MonthlyIncome({
  monthlyDates,
  setMonthlyDates,
}: {
  monthlyDates: any[];
  setMonthlyDates: any;
}) {
  const firstMonthBalance = useInputStore((state) => state.firstMonthBalance);
  const secondMonthBalance = useInputStore((state) => state.secondMonthBalance);
  const thirdMonthBalance = useInputStore((state) => state.thirdMonthBalance);
  const onChange = useInputStore((state) => state.onChange);

  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [thirdValue, setThirdValue] = useState("");

  const [firstValueError, setFirstValueError] = useState(false);
  const [secondValueError, setSecondValueError] = useState(false);
  const [thirdValueError, setThirdValueError] = useState(false);

  useEffect(() => {
    // Initialize monthly dates with current month and the previous two months
    const currentDate = new Date();
    const currentMonth = startOfMonth(currentDate);
    const previousMonth = startOfMonth(addMonths(currentMonth, +1));
    const twoMonthsAgo = startOfMonth(addMonths(currentMonth, 2));

    setMonthlyDates([currentMonth.toISOString().split("T")[0], previousMonth.toISOString().split("T")[0], twoMonthsAgo.toISOString().split("T")[0]]);

    // Set initial values for income inputs
    setFirstValue(firstMonthBalance);
    setSecondValue(secondMonthBalance);
    setThirdValue(thirdMonthBalance);
  }, []);

  const handleFirstIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstIncomeValue = e.currentTarget.value;
    onChange("firstMonthBalance", firstIncomeValue);
    setFirstValue(firstIncomeValue);
    setFirstValueError(firstIncomeValue.trim() === "");
  };

  const handleSecondIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const secondBalanceValue = e.currentTarget.value;
    onChange("secondMonthBalance", secondBalanceValue);
    setSecondValue(secondBalanceValue);
    setSecondValueError(secondBalanceValue.trim() === "");
  };

  const handleThirdIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thirdBalanceValue = e.currentTarget.value;
    onChange("thirdMonthBalance", thirdBalanceValue);
    setThirdValue(thirdBalanceValue);
    setThirdValueError(thirdBalanceValue.trim() === "");
  };

  const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    // Update monthly dates based on the selected first month
    const firstMonthDate = new Date(value);
    const secondMonth = endOfMonth(addMonths(firstMonthDate, 1));
    const thirdMonth = endOfMonth(addMonths(firstMonthDate, 2));

    setMonthlyDates([
      firstMonthDate.toISOString().split("T")[0],
      secondMonth.toISOString().split("T")[0],
      thirdMonth.toISOString().split("T")[0],
    ]);
  };

  return (
    <div className="bg-secondary/50 rounded-lg p-7 grid gap-2">
      <Label className="font-medium text-xl">Monthly Income*</Label>
      <div className="income gap-4 flex rounded-lg">
        <form className="monthly-income grid w-full gap-2 relative">
          <Label className="">Months</Label>
          {[1, 2, 3].map((month) => (
            <React.Fragment key={month}>
              <Input
                className="income w-full"
                type="date"
                name={`monthlyIncome${month}`}
                placeholder={month === 1 ? "Enter Date" : ""}
                value={monthlyDates[month - 1] || ""}
                onChange={handleFirstInputChange}
              />
            </React.Fragment>
          ))}
        </form>

        <form className="growth-rate w-full grid gap-2">
          <Label>Monthly Income*</Label>
          <div>
            <Input
              type="number"
              placeholder="Income"
              onChange={handleFirstIncomeChange}
              value={firstValue}
              disabled={!monthlyDates[0]}
            />
            {firstValueError && <p className="text-red-500 text-sm">insert value for this month income.</p>}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Income"
              onChange={handleSecondIncomeChange}
              value={secondValue}
              disabled={!monthlyDates[1]}
            />
            {secondValueError && <p className="text-red-500 text-sm">insert value for this month income.</p>}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Income"
              onChange={handleThirdIncomeChange}
              value={thirdValue}
              disabled={!monthlyDates[2]}
            />
            {thirdValueError && <p className="text-red-500 text-sm">insert value for this month income.</p>}
          </div>
        </form>
      </div>

      {!monthlyDates[0] && <p className="text-red-500 text-sm">Please fill in the date for the first month.</p>}
    </div>
  );
}

export default MonthlyIncome;