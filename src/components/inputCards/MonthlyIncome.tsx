import useInputStore from '@/store/store';
import React, { useState } from 'react'
import { addMonths } from 'date-fns';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

  function MonthlyIncome({ monthlyDates, setMonthlyDates }: { monthlyDates: any[], setMonthlyDates: any }) {

  const setField = useInputStore((state) => state.setField);
  const firstMonthBalance = useInputStore((state) => state.firstMonthBalance);
  const secondMonthBalance = useInputStore((state) => state.secondMonthBalance);
  const thirdMonthBalance = useInputStore((state) => state.thirdMonthBalance);

  const handleFirstInputChange = (e: any) => {
    const value = e.target.value;

    setMonthlyDates([value, null, null]);

    if (isNaN(Date.parse(e.target.value))) {
      console.error('Invalid date format. Please enter a valid date.');
      return;
    }

    const firstMonthDate = new Date(value);
    for (let index = 1; index < 3; index++) {
      const nextMonth = addMonths(firstMonthDate, index);
      setMonthlyDates((prevDates: any[]) => [
        ...prevDates.slice(0, index),
        nextMonth.toISOString().split('T')[0],
      ]);
    }
  };
  return (
    <div className='bg-secondary/50 rounded-lg p-7 grid gap-2'>
      <Label className="font-medium  text-xl">Monthly Income</Label>
      <div className="income  gap-4 flex rounded-lg ">
        <form className="monthly-income grid w-full gap-2 pt-5">
          <Label className="">Months</Label>
          <p className="text-gray-500 text-sm">
            Month
          </p>
          {[1, 2, 3].map((month) => (
            <React.Fragment key={month}>
              <Input
                className='w-full'
                type="date"
                name={`monthlyIncome${month}`}
                placeholder={month === 1 ? "Enter Date" : ""}
                value={monthlyDates[month - 1] || ""} // Provide a default value of an empty string
                onChange={handleFirstInputChange}
              />
            </React.Fragment>
          ))}
        </form>

       
        <form className="growth-rate w-full grid gap-2 pt-5">
          <Label>Current Balance</Label>
          <p className="text-gray-500 text-sm">
            Balance at this month
          </p>
          <Input
            type="number"
            name="name"
            value={firstMonthBalance || ""}
            placeholder="Current Balance"
            onChange={(e) => {
              setField("firstMonthBalance", parseFloat(e.target.value) || 0);
              // calculateBurnRate();
            }}
          />

          <Input
            type="number"
            name="name"
            value={secondMonthBalance || ""}
            placeholder="Current Balance"
            onChange={(e) => {
              setField("secondMonthBalance", parseFloat(e.target.value) || 0);
              // calculateBurnRate();
            }}
          />

          <Input
            type="number"
            name="name"
            value={thirdMonthBalance || ""}
            placeholder="Current Balance"
            onChange={(e) => {
              setField("thirdMonthBalance", parseFloat(e.target.value) || 0);
              // calculateBurnRate();
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default MonthlyIncome