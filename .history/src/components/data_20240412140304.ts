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
const nonPayrollReductionTimeline = useInputStore((state:any) => state.nonPayrollReductionTimeline)

function RunawayCalculator(){
    let cashBalance = initialCashBalance;
    let runwayMonths = 0;

    while (cashBalance) {
      
        // Calculate monthly revenue
        let monthlyRevenue = monthlyIncome * (1 + monthlyGrowthRate / 100);

        // Calculate gross profit
        let grossProfit = monthlyRevenue - (monthlyRevenue * (cogsPercentage / 100));

        // Calculate net income
        let netIncome = grossProfit - (payRoll + nonPayRoll);

        // Update cash balance
        cashBalance += netIncome;
        cashBalance += fundraisingAmount; // Assuming fundraising adds cash
        cashBalance -= monthlyCompensation; // Assuming monthly hiring costs
        cashBalance -= nonPayrollReduction; // Assuming reduction in non-payroll expenses

        // Move to the next month
        runwayMonths++;

        if (fundraisingTimeline && runwayMonths >= fundraisingTimeline) {
            // End calculation after fundraising timeline
            break;
        }
    }

    return runwayMonths;
  }
  
