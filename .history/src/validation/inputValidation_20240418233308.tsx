import { useState } from "react";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  initialCashBalance: yup.number().positive().required("Cash balance is required"),
  currentCashBalance: yup.number().positive().required("Current cash balance is required"),
  monthlyIncome: yup.number().positive().required("Monthly income is required"),
  monthlyGrowthRate: yup.number().min(0).required("Monthly growth rate is required"),
  cogsPercentage: yup.number().min(0).max(100).required("COGS percentage is required"),
  payRoll: yup.number().min(0).required("Payroll amount is required"),
  nonPayRoll: yup.number().min(0).required("Non-payroll amount is required"),
  fundraisingAmount: yup.number().min(0).required("Fundraising amount is required"),
  monthlyCompensation: yup.number().min(0).required("Monthly compensation is required"),
  nonPayrollReduction: yup.number().min(0).required("Non-payroll reduction amount is required"),
  nonPayrollReductionTimeline: yup.number().min(0).required("Non-payroll reduction timeline is required"),
  fundraisingTimeline: yup.number().min(0).required("Fundraising timeline is required"),
  newHiresTimeline: yup.number().min(0).required("New hires timeline is required"),
});

const [initialCashBalanceError, setInitialCashBalanceError] = useState("");
const setField = useInputStore((state) => state.setField);
export const handleInitialCashBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  if (value === "" ) {
    setInitialCashBalanceError("");
    setField("initialCashBalance",0); // Update the field value to null or whatever default value you prefer
  } else if (isNaN(parseFloat(value))) {
    setInitialCashBalanceError("Cash balance must be a number");
  } else if (parseFloat(value) < 0) {
    setInitialCashBalanceError("Cash balance must be a non-negative number");
  } else {
    setInitialCashBalanceError("");
    setField("initialCashBalance", parseFloat(value));
  }
};
