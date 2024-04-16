import useInputStore from "@/store/store";
const initialCashBalance = useInputStore((state:any) => state.initialCashBalance)
const monthlyIncome = useInputStore((state:any) => state.monthlyIncome) 
const monthlyGrowthRate = useInputStore((state:any) => state.monthlyGrowthRate)
const cogsPercentage = useInputStore((state:any) => state.cogsPercentage)
const payRoll = useInputStore((state:any) => state.payRoll)
const nonPayRoll = useInputStore((state:any) => state.nonPayRoll)
const fundraisingAmount = useInputStore((state:any) => state.fundraisingAmount)
const monthlyCompensation = useInputStore((state:any) => state.monthlyCompensation)
const nonPayrollReduction = useInputStore((state:any) => state.nonPayrollReduction)
const fundraisingTimeline = useInputStore((state:any) => state.fundraisingTimeline)
const newHiresTimeline = useInputStore((state:any) => state.newHiresTimeline)

