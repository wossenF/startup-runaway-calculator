import create from 'zustand';

const inputStore = create((set) => ({
    data:[],
    // addData: (data) => set((state) => ({ data: [...state.data, data] })),
    addInitialCashBalance:(initialCashBalance:number)=>set((state:any)=>({initialCashBalance})),
    

  
}));

export default inputStore;