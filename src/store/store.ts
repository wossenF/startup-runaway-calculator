import { create } from "zustand";

export interface InputStoreState {
  firstMonthBalance: number;
  secondMonthBalance: number;
  thirdMonthBalance: number;
  initialCashBalance: string;
  currentCashBalance: string;
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
  error: string;
  validationErrors: Partial<Record<keyof InputStoreState, string>>;
}

// Define setField function signature
type SetField = (field: keyof InputStoreState, value: string | number) => void;
type OnChange = (field: keyof InputStoreState,value: any) => void;

type UpdateCostValue = (field: keyof InputStoreState, value: number) => void;
type SetError = (value: string) => void;

type InputStore = InputStoreState & {
  setField: SetField;
  updateCostValue: UpdateCostValue;
  setError: SetError;
  onChange: OnChange;
};

// Create store
const useInputStore = create<InputStore>((set) => ({
  firstMonthBalance: 0,
  secondMonthBalance: 0,
  thirdMonthBalance: 0,
  initialCashBalance: "",
  currentCashBalance: "",
  monthlyIncome: 0,
  monthlyGrowthRate: 1,
  cogsPercentage: 1,
  payRoll: 0,
  nonPayRoll: 0,
  fundraisingAmount: 0,
  monthlyCompensation: 0,
  nonPayrollReduction: 0,
  nonPayrollReductionTimeline: 0,
  fundraisingTimeline: 0,
  newHiresTimeline: 0,
  validationErrors: "",
  error: "",
  prevousValidValue: {},

  // Define setField function
  setField: (field, value) => {
    console.log("Received value:", value);
    if (typeof value !== "number" || isNaN(value)) {
      // Set validation error message if value is not a number
      console.error("Validation Error:", `${field} must be a number.`);
      set((state) => ({
        ...state,
        validationErrors: {
          ...state.validationErrors,
          [field]: "Value must be a number.",
        },
      }));
    } else {
      // If value is valid, clear the error message
      set((state) => ({
        ...state,
        [field]: value,
        validationErrors: { ...state.validationErrors, [field]: undefined },
      }));
    }
  },

  onChange: (fieldName, value) => {
    const numericRegex = /^\d+(\.\d+)?(k|m|b|t)?$/i;
    const inputValue = value?.trim().toLowerCase();

    if (numericRegex.test(inputValue)) {
      let numericValue = parseFloat(inputValue);

      if (inputValue.endsWith("k")) {
        numericValue *= 1000;
      } else if (inputValue.endsWith("m")) {
        numericValue *= 1000000;
      } else if (inputValue.endsWith("b")) {
        numericValue *= 1000000000;
      } else if (inputValue.endsWith("t")) {
        numericValue *= 1000000000000;
      }

      set((state) => ({
        ...state,
        [fieldName]: numericValue,
        validationErrors: { ...state.validationErrors, [fieldName]: undefined },
        error: "", // Clear any previous error
      }));
    } else {
      set((state) => ({
        ...state,
        error: "Invalid input format. Please enter a valid number.",
      }));
    }
  },

  setError: (error) => set((state) => ({ error })),
  updateCostValue: () =>
    set((state) => ({ initialCashBalance: state.initialCashBalance })),
}));

export default useInputStore;
