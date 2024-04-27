import { create } from "zustand";

export interface InputStoreState {
  growthRate: number;
  // burnRate: number;
  expenseRate: number;
  firstMonthBalance: any;
  secondMonthBalance: any;
  thirdMonthBalance: any;
  firstMonthexpense: any;
  secondMonthexpense: any;
  thirdMonthexpense: any;
  initialCashBalance: any;
  currentCashBalance: string;
  error: string;
  eachmonthsIncome: string;
  eachmonthsExpense: string;


  // eachmonthsData: any,

  validationErrors: Partial<Record<keyof InputStoreState, string>>;
  // Add fields for storing calculation results
  runway: number;
  monthsRemaining: number | string;
  totalBurnRate: number;
  IncomegrowthRateDecimal: number;
  expensesgrowthRateDecimal: number;
}

// Define setField function signature
type SetField = (field: keyof InputStoreState, value: string | number) => void;
type OnChange = (field: keyof InputStoreState, value: any) => void;

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
  firstMonthBalance: "",
  secondMonthBalance: "",
  thirdMonthBalance: "",
  firstMonthexpense: "",
  secondMonthexpense: "",
  thirdMonthexpense: "",
  initialCashBalance: "",
  currentCashBalance: "",
  validationErrors: "",
  eachmonthsIncome: '',
  eachmonthsExpense: "",

  // eachmonthsData: "",
  growthRate: 0,
  burnRate: 0,
  expenseRate: 0,
  error: "",
  prevousValidValue: {},
  // Initialize calculation result fields
  runway: 0,
  monthsRemaining: "",
  totalBurnRate: 0,
  IncomegrowthRateDecimal: 0,
  expensesgrowthRateDecimal: 0,

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
