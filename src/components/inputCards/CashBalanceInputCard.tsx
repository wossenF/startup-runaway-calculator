import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function CashBalanceInputCard() {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false); // State for error flag

  const error = useInputStore((state) => state.error);

  const initialCashBalance = useInputStore((state) => state.initialCashBalance);

  const onChange = useInputStore((state) => state.onChange);

  useEffect(() => {
    setInputValue(initialCashBalance || "");
  }, [initialCashBalance]);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    onChange("initialCashBalance", value);

    // Check if input is empty and set error flag
    setHasError(value === "");

    // Clear the global state if the input value becomes empty (optional)
    if (value === "") {
      onChange("initialCashBalance", null);
    }
  };

  return (
    <form className="grid gap-2 bg-secondary/50 rounded-lg p-7">
      <Label className="font-medium text-xl">Cash Balance</Label>

      <p className="text-gray-500 text-sm">
        Current amount of cash available *
      </p>

      <Input
        type="number"
        name="initialCashBalance"
        placeholder="$1000,000"
        onChange={handleInputChange}
        value={inputValue}
      />

      {hasError && (
        <p className="text-red-500 text-sm">Please fill in the cash balance.</p>
      )}

      {!initialCashBalance && (
        <p className="text-gray-500 text-sm">
          Please fill with a number. {error}
        </p>
      )}
    </form>
  );
}

export default CashBalanceInputCard;
