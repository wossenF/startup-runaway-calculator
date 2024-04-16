import React, { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import {Button from "../components/ui/button";
import Result from "../components/Result";

const UserInput = () => {
  const calculate = "Calculate Runaway";
  const back = "Back to Calculator";
  const [isClicked, setIsClicked] = useState(false);
  const handleOnclick = () => {
    setIsClicked((prev) => !prev);
  };
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);
  const [formData, setFormData] = useState({
    initialCashBalance: 0,
    payRoll: 0,
    nonPayRoll: 0,
    monthlyIncome: 0,
    monthlyGrowthRate: 0,
    cogsPercentage: 0,
    fundraisingTimeline: 0,
    fundraisingAmount: 0,
    monthlyCompensation: 0,
    newHiresTimeline: 0,
    nonPayrollReduction: 0,
    nonPayrollReductionTimeline: 0,
  });

  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  function RunawayCalculator() {
    let cashBalance = formData.initialCashBalance;
    let runwayMonths = 0;

    while (cashBalance) {
      // Calculate monthly revenue
      let monthlyRevenue =
        formData.monthlyIncome *
        (1 + formData.monthlyGrowthRate / 100);

      // Calculate gross profit
      let grossProfit =
        monthlyRevenue - (monthlyRevenue * (formData.cogsPercentage / 100));

      // Calculate net income
      let netIncome = grossProfit - (formData.payRoll + formData.nonPayRoll);

      // Update cash balance
      cashBalance += netIncome;
      cashBalance += formData.fundraisingAmount; // Assuming fundraising adds cash
      cashBalance -= formData.monthlyCompensation; // Assuming monthly hiring costs
      cashBalance -= formData.nonPayrollReduction; // Assuming reduction in non-payroll expenses

      // Move to the next month
      runwayMonths++;

      if (
        formData.fundraisingTimeline &&
        runwayMonths >= formData.fundraisingTimeline
      ) {
        // End calculation after fundraising timeline
        break;
      }
    }

    return runwayMonths;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
        {/* Your form components here */}
      </div>
      {isClicked ? <Result /> : <UserInput />}
      <Button type="submit" onClick={handleOnclick}>
        {isClicked ? back : calculate}
      </Button>
    </>
  );
};

export default UserInput;
