import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";
// import { useInputValidation } from "@/validation/inputValidation";

function ExpenseInputCard() {
  // const setField = useInputStore((state) => state.setField);
  // const payrollValidation = useInputValidation("payRoll");
  // const nonPayrollValidation = useInputValidation("nonPayRoll");
  return (
    <div className="bg-secondary/50 rounded-lg p-7 grid gap-2">
      {/* <Label className="font-medium text-xl">Monthly Expenses</Label> */}
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
                    // onChange={handleOnChange}
                    value={useInputStore((state) => state.initialCashBalance)}
                />
            </form>
    </div>
  );
}

export default ExpenseInputCard;
