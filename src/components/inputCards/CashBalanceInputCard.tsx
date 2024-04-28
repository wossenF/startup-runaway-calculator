import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function CashBalanceInputCard() {

  const [inputValue, setInputValue] = useState("");

  const error = useInputStore((state) => state.error);

  const initialCostValue = useInputStore((state) => state.initialCashBalance);


  const onChange = useInputStore((state) => state.onChange);

  useEffect(() => {
    setInputValue(initialCostValue || '');
  }, [initialCostValue]);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    onChange("initialCashBalance", value);
    if (value === "") {
      // Clear the global state if the input value becomes empty
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

      {!initialCostValue && <p className="text-red-500 text-sm">{`Please fill with number`}{error}</p>}
    </form>
  );
}

export default CashBalanceInputCard;
