import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function GrowthRateCard() {

  const handleOnChange = (e: any) => {
    // onChange("monthlyIncome", e.target.value)
    
  }
  
  return (
    <div className="bg-secondary/50 rounded-lg p-7 grid gap-2">
      <Label className="font-medium text-xl">Monthly Growth Rate</Label>
      <form className="growth-rate grid gap-2 ">
                <p className="text-gray-500 text-sm">
                    we will calculate your growth rate.
                </p>
                <Input
                disabled
                    type="number"
                    name="name"
                    placeholder="%"
                    // onChange={handleOnChange}
                    value={useInputStore((state) => state.initialCashBalance)}
                />
            </form>
    </div>
  );
}

export default GrowthRateCard;
