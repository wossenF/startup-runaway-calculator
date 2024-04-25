"use client";
import React, { useState } from "react";
import useInputStore from "../store/store";
import MyComponent from "./Result/FinalResult";
import CashBalanceInputCard from "./inputCards/CashBalanceInputCard";
import ExpenseInputCard from "./inputCards/ExpenseInputCard";
import IncomeInputCard from "./inputCards/IncomeInputCard";
import EstimationInputCard from "./inputCards/EstimationInputCard";
import BurnRateInput from "./inputCards/MonthlyIncome";
import MonthlyExpenditure from "./inputCards/MonthlyExpenditure";
import MonthlyIncome from "./inputCards/MonthlyIncome";

const UserInput = () => {
  
  const [isClicked, setIsClicked] = useState(false);
  const [monthlyDates, setMonthlyDates] = useState(['', '', '']);

  const {
    initialCashBalance,
    monthlyIncome,
    monthlyGrowthRate,
    cogsPercentage,
    payRoll,
    nonPayRoll,
  } = useInputStore();
  // const setField = useInputStore((state) => state.setField);

  // const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   event.stopPropagation();
  // };

  // const calculateRunaway = () => {
  //   setIsClicked((prev) => !prev);
  // };
  // const [initialCashBalanceError, setInitialCashBalanceError] = useState("");
  // const handleInitialCashBalanceChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = e.target.value;

  //   if (value === "") {
  //     setInitialCashBalanceError("");
  //     setField("initialCashBalance", 0); // Update the field value to null or whatever default value you prefer
  //   } else if (isNaN(parseFloat(value))) {
  //     setInitialCashBalanceError("Cash balance must be a number");
  //   } else if (parseFloat(value) < 0) {
  //     setInitialCashBalanceError("Cash balance must be a non-negative number");
  //   } else {
  //     setInitialCashBalanceError("");
  //     setField("initialCashBalance", parseFloat(value));
  //   }
  // };

  return (
    <>
      {isClicked ? (
        <MyComponent />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-3">
          <CashBalanceInputCard />
          <ExpenseInputCard />
          <MonthlyIncome monthlyDates={monthlyDates} setMonthlyDates={setMonthlyDates} />
      <MonthlyExpenditure monthlyDates={monthlyDates} setMonthlyDates={setMonthlyDates} />
          {/* <IncomeInputCard /> */}
          {/* <EstimationInputCard /> */}
        </div>
      )}
    </>
  );
};

export default UserInput;
