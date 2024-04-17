import { create } from 'zustand';

// Define type for store state
export interface InputStoreState {
  initialCashBalance: number;
  monthlyIncome: number;
  monthlyGrowthRate: number;
  cogsPercentage: number;
  payRoll: number;
  nonPayRoll: number;
  fundraisingAmount: number;
  monthlyCompensation: number;
  nonPayrollReduction: number;
  nonPayrollReductionTimeline: number;
  fundraisingTimeline: number;
  newHiresTimeline: number;
  validationErrors: Partial<Record<keyof InputStoreState, string>>;
}

// Define setField function signature
type SetField = (field: keyof InputStoreState, value: number) => void;

type InputStore = InputStoreState & { setField: SetField };

// Create store
const useInputStore = create<InputStore>((set) => ({
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
    if (typeof value !== 'number' || isNaN(value)) {
      // Set validation error message if value is not a number
      set((state) => ({ ...state, validationErrors: { ...state.validationErrors, [field]: "Value must be a number." } }));
    } else {
      // Clear validation error and update field value
      set((state) => ({ ...state, [field]: value, validationErrors: { ...state.validationErrors, [field]: undefined } }));
    }
  },
}));

export default useInputStore;