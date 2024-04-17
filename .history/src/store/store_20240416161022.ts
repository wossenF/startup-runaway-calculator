import { create } from 'zustand';

// Define Zod schema
const InputSchema = {
  initialCashBalance: Number,
  monthlyIncome: Number,
  monthlyGrowthRate: Number,
  cogsPercentage: Number,
  payRoll: Number,
  nonPayRoll: Number,
  fundraisingAmount: Number,
  monthlyCompensation: 
  nonPayrollReduction: 
  nonPayrollReductionTimeline: 
  fundraisingTimeline: 
  newHiresTimeline: 
};

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
    console.log("Received value:", value); 
    // Validate input against schema using the shape property
    const validatedValue = InputSchema.shape[field].parse(value);
    set((state) => ({ ...state, [field]: validatedValue }));
    // Clear validation error for the field
    set((state) => ({ ...state, validationErrors: { ...state.validationErrors, [field]: undefined } }));
  },
}));
export type InputStoreState = z.infer<typeof InputSchema>;
export default useInputStore;
