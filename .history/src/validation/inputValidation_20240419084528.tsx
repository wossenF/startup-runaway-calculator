import { useState } from "react";
import useInputStore, { InputStoreState } from "../store/store";
import z from "zod";

export const validationSchema = z.object().shape({
  initialCashBalance: z.number().positive().required("Cash balance is required"),
  currentCashBalance: z.number().positive().required("Current cash balance is required"),
  monthlyIncome: z.number().positive().required("Monthly income is required"),
  monthlyGrowthRate: z.number().min(0).required("Monthly growth rate is required"),
  cogsPercentage: z.number().min(0).max(100).required("COGS percentage is required"),
  payRoll: z.number().min(0).required("Payroll amount is required"),
  nonPayRoll: z.number().min(0).required("Non-payroll amount is required"),
  fundraisingAmount: z.number().min(0).required("Fundraising amount is required"),
  monthlyCompensation: z.number().min(0).required("Monthly compensation is required"),
  nonPayrollReduction: z.number().min(0).required("Non-payroll reduction amount is required"),
  nonPayrollReductionTimeline: z.number().min(0).required("Non-payroll reduction timeline is required"),
  fundraisingTimeline: z.number().min(0).required("Fundraising timeline is required"),
  newHiresTimeline: z.number().min(0).required("New hires timeline is required"),
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
    .safeParse({ [fieldName]: value }) // Use safeParse to handle potential parsing errors
    .then((parsedData) => {
      // If validation succeeds, clear the error message for this field and update the store
      setErrors((prevErrors: Record<string, string>) => ({ ...prevErrors, [fieldName]: "" }));
      setField(fieldName, parsedData.data[fieldName]); // Access validated value from parsedData
    })
    .catch((error) => {
      // If validation fails, set the error message for this field
      if (error instanceof z.ZodError) {
        setInitialCashBalanceError(error.issues[0].message); // Access specific error message
      } else {
        console.error("Unexpected error during validation:", error);
      }
    });
};
