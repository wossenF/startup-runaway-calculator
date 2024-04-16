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

// Define setField function signature
type SetField = (field: keyof InputStoreState, value: number) => void;

type ValidationErrors = Partial<Record<keyof InputStoreState, string>>;

// Create store
const useInputStore = create<InputStoreState & { validationErrors:ValidationErrors; setField: SetField }>((set) => ({
 
  initialCashBalance: 10000,
  validationErrors:{},
} & {setField:SetField}) => ({
  // Getter/Setter pair for each field in the form data model
  ...Object.fromEntries(
    Object.keys(InputData).map((field) => [
      field as any,
      (value: number | undefined): [number, string] => {
        if (value === undefined) return [this[field], this.validationErrors[field] || ''];
        
        const [validatedValue,
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

  // Define setField function
  setField: (field, value) => {
    console.log("Received value:", value); // Log the received value
    // Validate input against schema using the shape property
    const validatedValue = InputSchema.shape[field].parse(value);
    set((state) => ({ ...state, [field]: validatedValue }));
  },
  
}));

export default useInputStore;
