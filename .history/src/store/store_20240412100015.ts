import create from 'zustand';

const inputStore = create((set) => ({
    data:[],
    addData: (data) => set((state) => ({ data: [...state.data, data] })),
    addinitialCashBalance:(initia)

  
}));

export default inputStore;