// validation.js
import create from 'zustand';
import * as yup from "yup";

export const useValidationStore = create((set) => ({
  validationSchema: yup.object().shape({
    initialCashBalance: yup.number().positive().required("Cash balance is required"),
    currentCashBalance: yup.number().positive().required("Current cash balance is required"),
    monthlyIncome: yup.number().positive().required("Monthly income is required"),
    monthlyGrowthRate: yup.number().min(0).required("Monthly growth rate is required"),
    cogsPercentage: yup.number().min(0).max(100).required("COGS percentage is required"),
    payRoll: yup.number().min(0).required("Payroll amount is required"),
    nonPayRoll: yup.number().min(0).required("Non-payroll amount is required"),
    fundraisingAmount: yup.number().min(0).required("Fundraising amount is required"),
    monthlyCompensation: yup.number().min(0).required("Monthly compensation is required"),
    nonPayrollReduction: yup.number().min(0).required("Non-payroll reduction amount is required"),
    nonPayrollReductionTimeline: yup.number().min(0).required("Non-payroll reduction timeline is required"),
    fundraisingTimeline: yup.number().min(0).required("Fundraising timeline is required"),
    newHiresTimeline: yup.number().min(0).required("New hires timeline is required"),
  }),
}));

// userInput.js


const useInputStore = useValidationStore;

export const useUserInputStore = create((set) => ({
  initialCashBalance: 0,
  monthlyIncome: 0,
  monthlyGrowthRate: 0,
  cogsPercentage: 0,
  payRoll: 0,
  nonPayRoll: 0,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export const handleInitialCashBalanceChange = (e) => {
  const value = e.target.value;
  const setField = useInputStore((state) => state.setField);
  const validationSchema = useInputStore((state) => state.validationSchema);
  const [initialCashBalanceError, setInitialCashBalanceError] = useState("");

  if (value === "") {
    setInitialCashBalanceError("");
    setField("initialCashBalance", 0);
  } else if (isNaN(parseFloat(value))) {
    setInitialCashBalanceError("Cash balance must be a number");
  } else if (parseFloat(value) < 0) {
    setInitialCashBalanceError("Cash balance must be a non-negative number");
  } else {
    setInitialCashBalanceError("");
    setField("initialCashBalance", parseFloat(value));
  }
};
