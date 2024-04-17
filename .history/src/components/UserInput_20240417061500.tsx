"use client";
import React, { useState } from "react"; // Import useState from 'react'
import { Button } from "./ui/button";
import useInputStore from "../store/store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import  MyComponent  from "./Result";
const UserInput = () => {
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);


  const [isClicked, setIsClicked] = useState(false);
  const {
    initialCashBalance,
    monthlyIncome,
    monthlyGrowthRate,
    cogsPercentage,
    payRoll,
    nonPayRoll,
  } = useInputStore();
  const setField = useInputStore((state) => state.setField);

  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Specify React.MouseEvent<HTMLDivElement> type
    event.stopPropagation();
  };

  const calculateRunaway = () => {
    setIsClicked((prev)=>!(prev));
  };

  return (
    <>
    {isClicked? (
      <MyComponent />
    ):
    (
      
    )
    }
      
    </>
  );
};

export default UserInput;
