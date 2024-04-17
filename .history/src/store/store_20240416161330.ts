import { create } from 'zustand';

// Create store
const useInputStore = create((set) => ({
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
  setField: (field:any, value:number) => {
    console.log("Received value:", value); 
    if (typeof value !== 'number' || isNaN(value)) {
      // Set validation error message if value is not a number
      set((state:any) => ({ ...state, validationErrors: { ...state.validationErrors, [field]: "Value must be a number." } }));
    } else {
      // Clear validation error and update field value
      set((state:any) => ({ ...state, [field]: value, validationErrors: { ...state.validationErrors, [field]: undefined } }));
    }
  },
}));

export default useInputStore;
