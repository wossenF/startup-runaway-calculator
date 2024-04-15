import React, { useState } from "react"; // Import React and useState
import useInputStore from "../store/store"; // Import useInputStore from correct path
import { z } from "zod";

// Define schema
const schema = z.object({
  initialCashBalance: z.number(),
  monthlyIncome: z.number(),
  monthlyGrowthRate: z.number(),
  cogsPercentage: z.number(),
  payRoll: z.number(),
  nonPayRoll: z.number(),
  fundraisingAmount: z.number(),
  monthlyCompensation: z.number(),
  nonPayrollReduction: z.number(),
  nonPayrollReductionTimeline: z.number(),
  fundraisingTimeline: z.number(),
  newHiresTimeline: z.number(),
});

const UserInput = () => {
  // Initialize state variables
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);

  // Define handleInputClick function
  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  // Retrieve setField function from useInputStore
  const setField = useInputStore((state) => state.setField);

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
      <div className="cash-balance bg-secondary/50 rounded-lg p-7">
        <form className="grid gap-2">
          <label className="font-medium text-xl">Cash Balance</label>
          <p className="text-gray-500 text-sm">
            Current amount of cash available
          </p>
          <input
            type="number"
            name="initialCashBalance"
            placeholder="$0.00"
            value={useInputStore((state) => state.initialCashBalance)}
            onChange={(e) =>
              setField("initialCashBalance", parseFloat(e.target.value))
            }
          />
          <span></span>
        </form>
      </div>

      <div className="monthly-expense bg-secondary/50 rounded-lg p-7 grid gap-2">
        <label className="font-medium text-xl">Monthly Expenses</label>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <form className="grid gap-2">
            <label className="">Payroll</label>
            <p className="text-gray-500 text-sm">
              monthly payroll salaries and contractor payments
            </p>
            <input
              type="number"
              name="payRoll"
              placeholder="negative number"
              onChange={(e) =>
                setField("payRoll", parseFloat(e.target.value))
              }
            />
          </form>
          <form className="grid gap-2">
            <label className="">NonPayroll</label>
            <p className="text-gray-500 text-sm">
              expenses like marketing, travel, and equipment
            </p>
            <input
              type="number"
              name="nonPayRoll"
              placeholder="negative number"
              onChange={(e) =>
                setField("nonPayRoll", parseFloat(e.target.value) || 0)
              }
            />
          </form>
        </div>
      </div>

      {/* Other sections... */}
    </div>
  );
};

export default UserInput;
