import { useState } from "react";
import useInputStore, { InputStoreState }  from "../store/store";
import z from "zod";

export const validationSchema = z.object().shape({
  initialCashBalance: z.number().positive().required("Cash balance is required"),
  currentCashBalance: z.number().positive().required("Current cash balance is required"),
  monthlyIncome: z.number().positive().required("Monthly income is required"),
  monthlyGrowthRate: zod.number().min(0).required("Monthly growth rate is required"),
  cogsPercentage: zod.number().min(0).max(100).required("COGS percentage is required"),
  payRoll: zod.number().min(0).required("Payroll amount is required"),
  nonPayRoll: zod.number().min(0).required("Non-payroll amount is required"),
  fundraisingAmount: zod.number().min(0).required("Fundraising amount is required"),
  monthlyCompensation: zod.number().min(0).required("Monthly compensation is required"),
  nonPayrollReduction: zod.number().min(0).required("Non-payroll reduction amount is required"),
  nonPayrollReductionTimeline: zod.number().min(0).required("Non-payroll reduction timeline is required"),
  fundraisingTimeline: zod.number().min(0).required("Fundraising timeline is required"),
  newHiresTimeline: zod.number().min(0).required("New hires timeline is required"),
});
const {
  initialCashBalance,
  monthlyIncome,
  monthlyGrowthRate,
  cogsPercentage,
  payRoll,
  nonPayRoll,
} = useInputStore();
const setField = useInputStore((state) => state.setField);

const [initialCashBalanceError, setInitialCashBalanceError] = useState("");
export const handleInputChange = (fieldName: keyof InputStoreState, setField: Function, setErrors: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  // Validate the input value against the schema
  validationSchema
    .validateAt(fieldName as string, { [fieldName]: value })
    .then(() => {
      // If validation succeeds, clear the error message for this field
      setErrors((prevErrors: Record<string, string>) => ({ ...prevErrors, [fieldName]: '' }));
      setField(fieldName, parseFloat(value));
    })
    .catch((error: zod.ValidationError) => {
      // If validation fails, set the error message for this field
      setErrors((prevErrors: Record<string, string>) => ({ ...prevErrors, [fieldName]: error.message }));
    });
};