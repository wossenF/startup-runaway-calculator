import create from 'zustand';

const inputStore = create((set) => ({
    addData: (data:any) => set((state:any) => ({ data: [...state.data, data] })),
    resetInputs: () => set({
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
        newHiresTimeline: 0
    }),
}));

const fields:(keyof InputStoreState)[] = = [
    'initialCashBalance',
    'monthlyIncome',
    'monthlyGrowthRate',
    'cogsPercentage',
    'payRoll',
    'nonPayRoll',
    'fundraisingAmount',
    'monthlyCompensation',
    'nonPayrollReduction',
    'nonPayrollReductionTimeline',
    'fundraisingTimeline',
    'newHiresTimeline'
];

fields.forEach((field) => {
    inputStore[field] = (value: number) =>
        inputStore.addData({ [field]: value });
});


export default inputStore;
