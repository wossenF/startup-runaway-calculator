import create from 'zustand';

const inputStore = create((set) => ({
    data:[],
    // addData: (data) => set((state) => ({ data: [...state.data, data] })),
    addInitialCashBalance:(initialCashBalance:number)=>set((state:any)=>({initialCashBalance})),
    addMonthlyIncome:(monthlyIncome:number)=>set((state:any)=>({monthlyIncome})),
    addMonthlyGrowthRate:(monthlyGrowthRate:number)=>set((state:any)=>({monthlyGrowthRate})),
    addCogsPercentage:(cogsPercentage:number)=>set((state:any)=>({cogsPercentage})),
    addPayRoll:(payRoll:number)=>set((state:any)=>({payRoll})),
    addNonPayRoll:(nonPayRoll:number)=>set((state:any)=>({nonPayRoll})),
    addFundraisingAmount:(fundraisingAmount:number)=>set((state:any)=>({fundraisingAmount})),
    addMonthlyCompensation:(monthlyCompensation:number)=>set((state:any)=>({monthlyCompensation})),
    addNonPayrollReduction:(nonPayrollReduction:number)=>set((state:any)=>({nonPayrollReduction})),
    addFundraisingTimeline:(fundraisingTimeline:number)=>set((state:any)=>({fundraisingTimeline})),
    ADD

  
}));

export default inputStore;