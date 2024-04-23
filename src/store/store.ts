import { create } from "zustand";

export interface InputStoreState {
  firstMonthBalance: number;
  secondMonthBalance: number;
  thirdMonthBalance: number;
  burnRate: number;
  runway: number;
  initialCashBalance: number;
  currentCashBalance: number;
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
type UpdateCostValue = (field: keyof InputStoreState, value: number) => void;
type CalculateBurnRate = () => void;
type UpdateFirstMonth = (value: number) => void;
type CalculateRunway = () => void;

type InputStore = InputStoreState & {
  setField: SetField;
  updateCostValue: UpdateCostValue;
  calculateBurnRate: CalculateBurnRate;
  updateFirstMonth: UpdateFirstMonth;
  calculateRunway:CalculateRunway
};

// Create store
const useInputStore = create<InputStore>((set) => ({
  firstMonthBalance: 0,
  secondMonthBalance: 0,
  thirdMonthBalance: 0,
  burnRate: 0,
  runway: 0,
  initialCashBalance: 0,
  currentCashBalance: 0,
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
    if (typeof value !== "number" || isNaN(value)) {
      // Set validation error message if value is not a number
      set((state) => ({
        ...state,
        validationErrors: {
          ...state.validationErrors,
          [field]: "Value must be a number.",
        },
      }));
    } else {

      set((state) => ({
        ...state,
        [field]: value,
        validationErrors: { ...state.validationErrors, [field]: undefined },
      }));
    }
  },

  updateCostValue: () =>
    set((state) => ({ initialCashBalance: state.initialCashBalance })),

  updateFirstMonth: (newValue: number) =>
    set((state) => ({ initialCashBalance: newValue })),

  calculateRunway: () =>
    set((state) => ({
      runway: state.initialCashBalance / state.burnRate ,
    })),


  calculateBurnRate: () =>
    set((state) => ({
      burnRate:
        (state.firstMonthBalance +
          state.secondMonthBalance +
          state.thirdMonthBalance) /
        3,
    })),
}));

export default useInputStore;
