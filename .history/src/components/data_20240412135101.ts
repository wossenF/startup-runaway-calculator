import useInputStore from "@/store/store";
const initialCashBalance = useInputStore((state:any) => state.initialCashBalance)
const monthlyIncome = useInputStore((state:any) => state.monthlyIncome) 
const monthlyGrowthRate = useInputStore((state:any) => state.monthlyGrowthRate)
const cogsPercentage = useInputStore((state:any) => state.cogsPercentage)
const payRoll = useInputStore((state:any) => state.payRoll)

