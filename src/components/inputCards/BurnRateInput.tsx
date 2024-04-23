import useInputStore from '@/store/store';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { addMonths } from 'date-fns';
function BurnRateInput() {
  const setField = useInputStore((state) => state.setField);
  const { firstMonthBalance, secondMonthBalance, thirdMonthBalance } = useInputStore((state) => state)
  const { calculateBurnRate } = useInputStore((state) => state)
  const [monthlyDates, setMonthlyDates] = useState(['null', 'null', 'null']); // Initial state for dates

  console.log(">>>>>>>>> first month balance", firstMonthBalance);
  const handleFirstInputChange = (e: any) => {
    const value = e.target.value; // No parsing as it's a date

    // Set the date for the first month using entered value
    setMonthlyDates([value, null, null]); // Update state with entered date

    // Check if a valid date is entered (optional)
    if (isNaN(Date.parse(e.target.value))) {
      console.error('Invalid date format. Please enter a valid date.');
      return; // Prevent further processing if invalid
    }

    // Calculate and set dates for subsequent months
    const firstMonthDate = new Date(value);
    for (let index = 1; index < 3; index++) {
      const nextMonth = addMonths(firstMonthDate, index); // Calculate next month
      setMonthlyDates((prevDates: any[]) => [
        ...prevDates.slice(0, index),
        nextMonth.toISOString().split('T')[0],
      ]); // Update state with next month date
    }
  };

  return (<div>
    <Label className="font-medium text-xl">Income</Label>
    <div className="income bg-secondary/50 items-center gap-4 flex rounded-lg p-7">
      <form className="monthly-income grid gap-2 pt-5">
        <Label className="">Months</Label>
        <p className="text-gray-500 text-sm">
          Month
        </p>
        {[1, 2, 3].map((month) => (
          <React.Fragment key={month}>
            <Input
              type="date"
              name={`monthlyIncome${month}`} // Use descriptive names
              placeholder={month === 1 ? "Enter Date" : ""}
              value={monthlyDates[month - 1]} // Set value from state
              onChange={handleFirstInputChange}
            />
          </React.Fragment>
        ))}
      </form>

      <form className="growth-rate grid gap-2 pt-5">
        <Label>Current Balance</Label>
        <p className="text-gray-500 text-sm">
          Balance at this month
        </p>
        <Input
          type="number"
          name="name"
          value={firstMonthBalance}
          placeholder="Current Balance"
          onChange={(e) => {
            setField("monthlyGrowthRate", parseFloat(e.target.value) || 0);
          }}
        />
        <Input
          type="number"
          name="name"
          value={secondMonthBalance}
          placeholder="Current Balance"
          onChange={(e) => {
            setField("monthlyGrowthRate", parseFloat(e.target.value) || 0);
          }}
        />

        <Input
          type="number"
          name="name"
          value={thirdMonthBalance || ""}
          placeholder="Current Balance"
          onChange={(e) => {
            setField("monthlyGrowthRate", parseFloat(e.target.value) || 0);
          }}
        />
      </form>
    </div>
  </div>
  )
}

export default BurnRateInput