import {create} from 'zustand';

// type InputStoreState = {
//   initialCashBalance: number;
//   monthlyIncome: number;
//   monthlyGrowthRate: number;
//   cogsPercentage: number;
//   payRoll: number;
//   nonPayRoll: number;
//   fundraisingAmount: number;
//   monthlyCompensation: number;
//   nonPayrollReduction: number;
//   nonPayrollReductionTimeline: number;
//   fundraisingTimeline: number;
//   newHiresTimeline: number;
  
// };

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

  setinitialCashBalance: (value),
  setmonthlyIncome: (value),
  setmonthlyGrowthRate: (value),
  setcogsPercentage: (value),
  setpayRoll: (value),
  setnonPayRoll: (value),
  setfundraisingAmount: (value),
  setmonthlyCompensation: (value),
  setnonPayrollReduction: (value),
  setnonPayrollReductionTimeline: (value),
  setfundraisingTimeline: (value),
  setnewHiresTimeline: (value),
//   addData: (data:any) => set((state) => ({ ...state, ...data })),
//   resetInputs: () =>
//     set((state) => ({
//       ...state,
//       initialCashBalance: 0,
//       monthlyIncome: 0,
//       monthlyGrowthRate: 0,
//       cogsPercentage: 0,
//       payRoll: 0,
//       nonPayRoll: 0,
//       fundraisingAmount: 0,
//       monthlyCompensation: 0,
//       nonPayrollReduction: 0,
//       nonPayrollReductionTimeline: 0,
//       fundraisingTimeline: 0,
//       newHiresTimeline: 0,
//     })),

}));

export default useInputStore;
