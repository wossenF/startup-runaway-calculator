import React, { useState } from "react";
import useInputStore from "../store/store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import MyComponent from "./Result";
import * as yup from 'yup';
import CashBalanceInputCard from "./inputCards/CashBalanceInputCard";
import ExpenseInputCard from "./inputCards/ExpenseInputCard";
import IncomeInputCard from "./inputCards/IncomeInputCard";
import EstimationInputCard from "./inputCards/EstimationInputCard";

const validationSchema = yup.object().shape({
  initialCashBalance: yup.number().positive().required("Cash balance is required"),
});

const UserInput = () => {
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [initialCashBalanceError, setInitialCashBalanceError] = useState("");

  const {
    currency,
    initialCashBalance,
    monthlyIncome,
    monthlyGrowthRate,
    cogsPercentage,
    payRoll,
    nonPayRoll,
  } = useInputStore();
  const setField = useInputStore((state) => state.setField);
  
  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  
  const calculateRunaway = () => {
    setIsClicked((prev) => !prev);
  };

  const handleInitialCashBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setInitialCashBalanceError("");
      setField("initialCashBalance", 0);
    } else if (isNaN(parseFloat(value))) {
      setInitialCashBalanceError("Cash balance must be a number");
    } else if (parseFloat(value) < 0) {
      setInitialCashBalanceError("Cash balance must be a non-negative number");
    } else {
      setInitialCashBalanceError("");
      setField("initialCashBalance", parseFloat(value));
    }
  };

  const handleCurrencyButtonClick = (selectedCurrency: string) => {
    setField("currency", selectedCurrency);
    console.log(currency)
  };

  return (
    <>
      
    
   


      {isClicked ? (
        <MyComponent />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-3">
          <CashBalanceInputCard />
          <ExpenseInputCard />
          <IncomeInputCard />
          <EstimationInputCard />
        </div>
      )}
    </>
  );
};

export default UserInput;