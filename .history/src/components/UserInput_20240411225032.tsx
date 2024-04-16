import React, { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import Button from "../components/ui/button";
import Result from "../components/Result";

const UserInput = () => {
  const calculate = "Calculate Runaway";
  const back = "Back to Calculator";
  const [isClicked, setIsClicked] = useState(false);
  const handleOnclick = () => {
    setIsClicked((prev) => !prev);
  };
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

    while (cashBalance > 0) {
      let monthlyRevenue =
        formData.monthlyIncome *
        (1 + formData.monthlyGrowthRate / 100);

      let grossProfit =
        monthlyRevenue - (monthlyRevenue * (formData.cogsPercentage / 100));

      let netIncome = grossProfit - (formData.payRoll + formData.nonPayRoll);

      cashBalance += netIncome;
      cashBalance += formData.fundraisingAmount;
      cashBalance -= formData.monthlyCompensation;
      cashBalance -= formData.nonPayrollReduction;

      runwayMonths++;

      if (
        formData.fundraisingTimeline &&
        runwayMonths >= formData.fundraisingTimeline
      ) {
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
      {isClicked ? <Result /> : null}
      <Button type="submit" onClick={handleOnclick}>
        {isClicked ? back : calculate}
      </Button>
      {isClicked ? (
        <div>
          <p>Runway Months: {RunawayCalculator()}</p>
        </div>
      ) : null}
    </>
  );
};

export default UserInput;
