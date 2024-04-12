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

  setinitialCashBalance: (value:number) => set((),
  setmonthlyIncome: (value:number) => set((),
  setmonthlyGrowthRate: (value:number) => set((),
  setcogsPercentage: (value:number) => set((),
  setpayRoll: (value:number) => set((),
  setnonPayRoll: (value:number) => set((),
  setfundraisingAmount: (value:number) => set((),
  setmonthlyCompensation: (value:number) => set((),
  setnonPayrollReduction: (value:number) => set((),
  setnonPayrollReductionTimeline: (value:number) => set((),
  setfundraisingTimeline: (value:number) => set((),
  setnewHiresTimeline: (value:number) => set((),
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
