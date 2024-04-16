import create from 'zustand';

const inputStore = create((set) => ({
    data:[],
    addData: (data) => set((state) => ({ data: [...state.data, data] })),
    addinitialCashBalance:(initialCashBalance)=>

  
}));

export default inputStore;