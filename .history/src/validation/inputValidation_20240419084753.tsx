import { useState } from "react";
import useInputStore from "../store/store";
import { z } from "zod";

// Define the validation schema using Zod
const validationSchema = z.object({
  initialCashBalance: z.number().positive().nonnegative().optional(),
  currentCashBalance: z.number().positive().nonnegative().optional(),
  monthlyIncome: z.number().positive().nonnegative().optional(),
  monthlyGrowthRate: z.number().min(0).optional(),
  cogsPercentage: z.number().min(0).max(100).optional(),
  payRoll: z.number().min(0).optional(),
  nonPayRoll: z.number().min(0).optional(),
  fundraisingAmount: z.number().min(0).optional(),
  monthlyCompensation: z.number().min(0).optional(),
  nonPayrollReduction: z.number().min(0).optional(),
  nonPayrollReductionTimeline: z.number().min(0).optional(),
  fundraisingTimeline: z.number().min(0).optional(),
  newHiresTimeline: z.number().min(0).optional(),
});

const {
  initialCashBalance: initialCashBalanceValue,
  monthlyIncome: monthlyIncomeValue,
  monthlyGrowthRate: monthlyGrowthRateValue,
  cogsPercentage: cogsPercentageValue,
  payRoll: payRollValue,
  nonPayRoll: nonPayRollValue,
} = useInputStore();
const setField = useInputStore((state) => state.setField);

// Function to handle changes in initial cash balance
export const handleInitialCashBalanceChange = (e:any) => {
  const value = e.target.value;

  // Validate the input against the schema
  const parsedValue = parseFloat(value);
  const validationResult = validationSchema.partial().safeParse({
    initialCashBalance: parsedValue,
  });

  if (!validationResult.success) {
    // Handle validation errors
    setInitialCashBalanceError(validationResult.error.message);
  } else {
    // No validation errors, update the field value
    setInitialCashBalanceError("");
    setField("initialCashBalance", parsedValue);
  }
};

// State for initial cash balance error
const [initialCashBalanceError, setInitialCashBalanceError] = useState("");
