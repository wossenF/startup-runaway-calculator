import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function IncomeInputCard() {
  const onChange = useInputStore((state) => state.onChange);
  const handleOnChange = (e: any) => {
    onChange("monthlyIncome", e.target.value);
  };

  return (
    <div className="income bg-secondary/50 rounded-lg p-7">
      <Label className="font-medium text-xl">Income</Label>
      <form className="monthly-income grid gap-2 pt-5">
        <Label className="">Monthly Income</Label>
        <p className="text-gray-500 text-sm">
          Current amount of cash available
        </p>
        <Input
          type="number"
          name="name"
          placeholder="$0.00"
          onChange={handleOnChange}
          value={useInputStore((state) => state.monthlyIncome)}
        />
      </form>

      <form className="growth-rate grid gap-2 pt-5">
        <Label>Monthly Growth Rate</Label>
        <p className="text-gray-500 text-sm">
          percentage increase in monthly revenue
        </p>
        <Input
          disabled
          type="number"
          name="name"
          placeholder="%"
          onChange={handleOnChange}
          value={useInputStore((state) => state.initialCashBalance)}
        />
      </form>
    </div>
  );
}

export default IncomeInputCard;
