import { create } from 'zustand';
import { z, ZodType } from 'zod';

// Define Zod schema
const InputSchema = z.object({
  initialCashBalance: z.number().min(10000,'Initial cash balance must be at least $10,000').nonnegative(
    {message:'Initial cash balance cannot be negative'}
  ),
  
  monthlyIncome: z.number(),
  monthlyGrowthRate: z.number(),
  cogsPercentage: z.number(),
  payRoll: z.number(),
  nonPayRoll: z.number(),
  fundraisingAmount: z.number(),
  monthlyCompensation: z.number(),
  nonPayrollReduction: z.number(),
  nonPayrollReductionTimeline: z.number(),
  fundraisingTimeline: z.number(),
  newHiresTimeline: z.number(),
});

// Define type for input store state
type InputStoreState = z.infer<typeof InputSchema>;

// Define type for validation errors
type ValidationErrors = Partial<Record<keyof InputStoreState, string>>;

// Define setField function signature
type SetField = (field: keyof InputStoreState, value: number) => void;


export default useInputStore;
