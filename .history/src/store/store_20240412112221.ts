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

  setinitialCashBalance: 0,
  setmonthlyIncome: 0,
  setmonthlyGrowthRate: 0,
  setcogsPercentage: 0,
  setpayRoll: 0,
  setnonPayRoll: 0,
  setfundraisingAmount: 0,
  setmonthlyCompensation: 0,
  setnonPayrollReduction: 0,
  setnonPayrollReductionTimeline: 0,
  setfundraisingTimeline: 0,
  setnewHiresTimeline: 0,
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
