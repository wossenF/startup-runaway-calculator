import { z } from 'zod';

// Define Zod schema for input validation
export const InputSchema = z.object({
  initialCashBalance: z.number({}).nonnegative(),
  monthlyIncome: z.number().nonnegative(),
  monthlyGrowthRate: z.number().min(0).max(100),
  cogsPercentage: z.number().min(0).max(100),
  payRoll: z.number().negative(),
  nonPayRoll: z.number().negative(),
  fundraisingAmount: z.number().optional(),
  monthlyCompensation: z.number().optional(),
  nonPayrollReduction: z.number().optional(),
  nonPayrollReductionTimeline: z.number().min(0).max(12).optional(),
  fundraisingTimeline: z.number().min(0).max(12).optional(),
  newHiresTimeline: z.number().min(0).max(12).optional(),
});

// Define a type for the input data based on the Zod schema
export type InputData = z.infer<typeof InputSchema>;
