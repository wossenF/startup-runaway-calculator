import { create } from 'zustand';
import {z} from 

type InputStoreState = {
  [x: string]: any;
  initialCashBalance: number;
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
};

const useInputStore = create<InputStoreState>((set) => ({
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

  setField: (field: keyof InputStoreState, value: number) => set((state) => ({ ...state, [field]: value })),
}));

export default useInputStore;
