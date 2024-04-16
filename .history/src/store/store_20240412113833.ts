import {create} from 'zustand';



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

  setinitialCashBalance: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setmonthlyIncome: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setmonthlyGrowthRate: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setcogsPercentage: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setpayRoll: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setnonPayRoll: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setfundraisingAmount: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setmonthlyCompensation: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setnonPayrollReduction: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setnonPayrollReductionTimeline: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setfundraisingTimeline: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
  setnewHiresTimeline: (value:number) => set((state:any) => ({ ...state, initialCashBalance: value })),
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
