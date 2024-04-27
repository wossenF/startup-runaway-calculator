"use client";
import React, { useState } from "react";
import MyComponent from "./Result/ChartReport";
import CashBalanceInputCard from "./inputCards/CashBalanceInputCard";
import AboutTheCalculator from "./inputCards/GrowthRateCard";
import MonthlyExpenditure from "./inputCards/MonthlyExpenditure";
import MonthlyIncome from "./inputCards/MonthlyIncome";

const UserInput = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [monthlyDates, setMonthlyDates] = useState(["", "", ""]);
  return (
    <>
      {isClicked ? (
        <MyComponent />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-3">
          <AboutTheCalculator />
          <CashBalanceInputCard />
          <MonthlyIncome
            monthlyDates={monthlyDates}
            setMonthlyDates={setMonthlyDates}
          />
          <MonthlyExpenditure
            monthlyDates={monthlyDates}
            setMonthlyDates={setMonthlyDates}
          />
        </div>
      )}
    </>
  );
};

export default UserInput;
