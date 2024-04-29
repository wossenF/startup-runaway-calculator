import { create } from "zustand";

export interface InputStoreState {
  growthRate: number;
  expenseRate: number;
  firstMonthBalance: string;
  secondMonthBalance: string;
  thirdMonthBalance: string;
  firstMonthexpense: string;
  secondMonthexpense: string;
  thirdMonthexpense: string;
  initialCashBalance: string;
  currentCashBalance: string;
  totalProfit: number;
  error: string;
  eachmonthsIncome: string;
  eachmonthsExpense: string;
  eachmonthsProfit: string;
  validationErrors: Partial<Record<keyof InputStoreState, string>>;
  runway: number;
  monthsRemaining: number | string;
  totalBurnRate: number;
  IncomegrowthRateDecimal: number;
  expensesgrowthRateDecimal: number;
  monthlyDates: string[];
}

// Define setField function signature
type SetField = (field: keyof InputStoreState, value: string | number) => void;
type OnChange = (field: keyof InputStoreState, value: any) => void;
type UpdateCostValue = (field: keyof InputStoreState, value: number) => void;
type SetError = (value: string) => void;
type SetTotalProfit = (value: number) => void;

type InputStore = InputStoreState & {
  setField: SetField;
  updateCostValue: UpdateCostValue;
  setError: SetError;
  onChange: OnChange;
  setTotalProfit: SetTotalProfit;
};

// Create store
const useInputStore = create<InputStore>((set) => ({
  firstMonthBalance: "1000",
  secondMonthBalance: "2000",
  thirdMonthBalance: "300",
  firstMonthexpense: "4500",
  secondMonthexpense: "3000",
  thirdMonthexpense: "3990",
  initialCashBalance: "100000", // Add initial value here
  currentCashBalance: "",
  validationErrors: {},
  eachmonthsProfit: "",
  eachmonthsIncome: "",
  eachmonthsExpense: "",
  monthsRemaining: "",
  error: "",
  totalProfit: 0,
  growthRate: 0,
  expenseRate: 0,
  runway: 0,
  totalBurnRate: 0,
  IncomegrowthRateDecimal: 0,
  expensesgrowthRateDecimal: 0,
  prevousValidValue: {},
  monthlyDates: ["01", "01", "2024"],
  
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
  setMonthlyDates: (dates: any) => set({ monthlyDates: dates }),
  updateCostValue: (field, value) =>
    set((state) => ({ [field]: value })),

  setTotalProfit: (value) => set((state) => ({ totalProfit: value })),
}));

export default useInputStore;
