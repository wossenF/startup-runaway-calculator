"use client";
import { MouseEvent, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import useInputStore from "../store/store";

const UserInput = () => {
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [runawayMonths, setRunawayMonths] = useState(0);
  const setField = useInputStore((state) => state.setField);

  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
  };
  
  // useEffect(() => {
  //   if (isClicked) {
  //     const months = RunawayCalculator();
  //     setRunawayMonths(months);
  //   }
  // }, [isClicked]);
  return (
    <>
      
      <Button type="submit" onClick={console.log()}>
      <Button type="submit" onClick={() => console.log()}>
        {isClicked ? "Back to Calculator" : "Calculate Runaway"}
      </Button>
      {isClicked && <p>Runaway Months: {runawayMonths}</p>}


    </>
  );
};

export default UserInput;
