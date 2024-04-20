import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import useInputStore from '@/store/store';

function ExpenseInputCard() {
    const setField = useInputStore((state) => state.setField);
  return (
<div className="monthly-expense bg-secondary/50 rounded-lg p-7 grid gap-2">
            <Label className="font-medium text-xl">Monthly Expenses</Label>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <form className="grid gap-2">
                <Label className="">Payroll</Label>
                <p className="text-gray-500 text-sm">
                  monthly payroll salaries and contractor payments
                </p>
                <Input
                  type="number"
                  name="name"
                  placeholder="negative number"
                  onChange={(e) => {
                    setField("payRoll", parseFloat(e.target.value));
                  }}
                />
              </form>
              <form className="grid gap-2">
                <Label className="">NonPayroll</Label>
                <p className="text-gray-500 text-sm">
                  expenses like marketing, travel, and equipment
                </p>
                <Input
                  type="number"
                  name="name"
                  placeholder="negative number"
                  onChange={(e) => {
                    setField("nonPayRoll", parseFloat(e.target.value) || 0);
                  }}
                />
              </form>
            </div>
          </div>
  )
}

export default ExpenseInputCard