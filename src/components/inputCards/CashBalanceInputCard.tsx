import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function CashBalanceInputCard() {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false); // State for error flag

  const initialCashBalance = useInputStore(
    (state: any) => state.initialCashBalance
  );

  const onChange = useInputStore((state) => state.onChange);

  useEffect(() => {
    setInputValue(initialCashBalance ? formatNumber(initialCashBalance) : "");
  }, [initialCashBalance]);

  const formatNumber = (value: any) => {
    if (isNaN(value)) return ""; // Return empty string if value is NaN
    return value.toLocaleString("en-US");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value.replace(/,/g, ""));

    // Check if the input value is a valid number
    if (isNaN(numericValue)) {
      setInputValue(value);
      setHasError(true);
      onChange("initialCashBalance", null); // Clear the global state if the input is not a valid number
    } else {
      const formattedValue = formatNumber(numericValue);
      setInputValue(formattedValue);
      onChange("initialCashBalance", numericValue);
      setHasError(value === "");
    }
  };

  return (
    <form className="grid gap-2 bg-secondary/50 rounded-lg p-7">
      <Label className="font-medium text-xl">Cash Balance</Label>

      <p className="text-gray-500 text-sm">
        Current amount of cash available *
      </p>

      <Input
        type="text"
        name="initialCashBalance"
        placeholder="$1,000,000"
        onChange={handleInputChange}
        value={inputValue}
      />
{/* 
      {hasError && (
        <p className="text-red-500 text-sm">Please fill in the cash balance.</p>
      )} */}

      {!initialCashBalance && (
        <p className="text-red-500 text-sm">Please fill in valid data</p>
      )}
    </form>
  );
}

export default CashBalanceInputCard;