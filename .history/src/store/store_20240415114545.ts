import { create } from 'zustand';
import { number, z, ZodType } from 'zod';

// Define Zod schema
const InputSchema = z.object({
  [key: string]: number,
  initialCashBalance: z.number().nonnegative(),
  monthlyIncome: z.number().nonnegative(),
  monthlyGrowthRate: z.number().min(0).max(100),
  cogsPercentage: z.number().min(0).max(100),
  payRoll: z.number().negative(),
  nonPayRoll: z.number().negative(),
  fundraisingAmount: z.number(),
  monthlyCompensation: z.number(),
  nonPayrollReduction: z.number(),
  nonPayrollReductionTimeline: z.number().min(0).max(12),
  fundraisingTimeline: z.number().min(0).max(12),
  newHiresTimeline: z.number().min(0).max(12),
});

// Define type for input store state
type InputStoreState = z.infer<typeof InputSchema>;

// Define setField function signature
type SetField = (field: keyof InputStoreState, value: number) => void;

type ValidationErrors = Partial<Record<keyof InputStoreState, string>>;

// Create store
const useInputStore = create<InputStoreState & { setField: SetField; validationErrors: ValidationErrors }>((set) => ({
  initialCashBalance: 0,
  monthlyIncome: 0,
  // ... other fields
  validationErrors: {},

  // Define setField function
  setField: (field, value) => {
    console.log("Received value:", value);
    const validatedValue = InputSchema.shape[field].parse(value);
    set((state) => ({
      [field]: validatedValue,
      validationErrors: { ...state.validationErrors, [field]: undefined },
    }));
  },
}));

export default useInputStore;
