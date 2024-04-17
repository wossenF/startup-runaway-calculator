import { create } from 'zustand';
import {  z, ZodType } from 'zod';

// Define Zod schema
const InputSchema = z.object({
  
  initialCashBalance: z.number().nonnegative("The value cannot be negative"),
  monthlyIncome: z.number().nonnegative("The value cannot be negative"),
  monthlyGrowthRate: z.number().min(0,the mini).max(100),
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
  monthlyGrowthRate: 0,
  cogsPercentage: 0,
  payRoll: 0,
  nonPayRoll: 0,
  fundraisingAmount: 0,
  monthlyCompensation: 0,
  nonPayrollReduction: 0,
  nonPayrollReductionTimeline: 0,
  fundraisingTimeline: 0,
  newHiresTimeline: 0,
  validationErrors: {}, // Initialize validation errors object

  // Define setField function
  setField: (field, value) => {
    console.log("Received value:", value); // Log the received value
    // Validate input against schema using the shape property
    const validatedValue = InputSchema.shape[field].parse(value);
    set((state) => ({ ...state, [field]: validatedValue }));
    // Clear validation error for the field
    set((state) => ({ ...state, validationErrors: { ...state.validationErrors, [field]: undefined } }));
  },
}));

export default useInputStore;