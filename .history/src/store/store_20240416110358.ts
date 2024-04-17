import { create } from 'zustand';

// Define type for input store state
type InputStoreState = {
  initialCashBalance: number;
  monthlyIncome: number;
  monthlyGrowthRate: number;
  cogsPercentage: number;
  payRoll: number;
  nonPayRoll: number;
  fundraisingAmount?: number;
  monthlyCompensation?: number;
  nonPayrollReduction?: number;
  nonPayrollReductionTimeline?: number;
  fundraisingTimeline?: number;
  newHiresTimeline?: number;
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
    console.log("Received value:", value); // Log the received value
    set((state) => ({ ...state, [field]: value }));
    // Clear validation error for the field
    set((state) => ({ ...state, validationErrors: { ...state.validationErrors, [field]: undefined } }));
  },
}));

export default useInputStore;
