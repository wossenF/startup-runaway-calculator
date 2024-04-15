import { create } from 'zustand';
import { number, z, ZodType } from 'zod';

// Define Zod schema
  [key:string]:number,
  monthlyIncome: z.number().nonnegative(),
  cogsPercentage: z.number().min(0).max(100),
  nonPayRoll: z.number().negative(),
  monthlyCompensation: z.number(),
  nonPayrollReductionTimeline: z.number().min(0).max(12),
  newHiresTimeline: z.number().min(0).max(12),

type InputStoreState = z.infer<typeof InputSchema>;
// Define setField function signature


const useInputStore = create<InputStoreState & { setField: SetField; validationErrors: ValidationErrors }>((set) => ({
  monthlyIncome: 0,
const InputSchema = z.object({
});
   newHiresTimeline: z.number().min(0).max(12),
   fundraisingTimeline: z.number().min(0).max(12),
   nonPayrollReductionTimeline: z.number().min(0).max(12),
   nonPayrollReduction: z.number(),
   monthlyCompensation: z.number(),
   fundraisingAmount: z.number(),
   nonPayRoll: z.number().negative(),
   payRoll: z.number().negative(),
   cogsPercentage: z.number().min(0).max(100),
   monthlyGrowthRate: z.number().min(0).max(100),
   monthlyIncome: z.number().nonnegative(),
   initialCashBalance: z.number().nonnegative(),
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