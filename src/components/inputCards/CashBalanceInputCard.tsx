import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function CashBalanceInputCard() {
  const [inputValue, setInputValue] = useState("");
  // const [initialValue, setInitialValue] = useState("");
  // const setField = useInputStore((state) => state.setField);
  const error = useInputStore((state) => state.error);
  const initialCostValue = useInputStore((state) => state.initialCashBalance);

  // const cashBalanceValidation = useInputValidation("initialCashBalance");
  const onChange = useInputStore((state) => state.onChange);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    onChange("initialCashBalance", value);
    setInputValue(value);
    // setField("initialCashBalance", value);

    // cashBalanceValidation.handleInputChange(value);
  };

  return (
    <form className="grid gap-2 bg-secondary/50 rounded-lg p-7">
      <Label className="font-medium text-xl">Cash Balance</Label>
      <p className="text-gray-500 text-sm">
        Current amount of cash available *
      </p>
      <Input
        // type="text"
        name="cashBalance"
        placeholder="$1000,000"
        onChange={handleInputChange}
        value={inputValue || initialCostValue}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

export default CashBalanceInputCard;
