import create from 'zustand';

const inputStore = create((set) => ({
    data:[],
    // addData: (data) => set((state) => ({ data: [...state.data, data] })),
    addInitialCashBalance:(initialCashBalance:number)=>set((state)=>({initialCashBalance})),

  
}));

export default inputStore;