import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function CashBalanceInputCard() {
  const setField = useInputStore((state) => state.setField);

  return (
    
      <form className="grid gap-2 bg-secondary/50 rounded-lg p-7">
        <Label className="font-medium text-xl">Cash Balance</Label>
        <p className="text-gray-500 text-sm">
          Current amount of cash available *
        </p>
        <Input
          name="name"
          placeholder="$1000,000"
          onChange={(e) => {
            setField("initialCashBalance", parseFloat(e.target.value) || 0);
          }}
        />
      </form>
  
  );
}

export default CashBalanceInputCard;
