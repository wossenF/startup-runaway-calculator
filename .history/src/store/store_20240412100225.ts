import create from 'zustand';

const inputStore = create((set) => ({
    data:[],
    // addData: (data) => set((state) => ({ data: [...state.data, data] })),
    addInitialCashBalance:(initialCashBalance:number)=>set((state:any)=>({initialCashBalance})),
    addMonthlyIncome:(monthlyIncome:number)=>set((state:any)=>({monthlyIncome})),
    addMonthlyGrowthRate:(monthlyGrowthRate:number)=>set((state:any)=>({monthlyGrowthRate})),
    addCogsPercentage:(cogsPercentage:number)=>set((state:any)=>({cogsPercentage})),
    

  
}));

export default inputStore;