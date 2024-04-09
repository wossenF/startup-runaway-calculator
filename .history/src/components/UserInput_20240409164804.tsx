"use client";
import { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";

const UserInput = () => {
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);
  const [initialCashBalance, setCashBalance] = useState(0);
  const [payRoll, setPayRoll] = useState(0);
  const [nonPayRoll, setNonPayRoll] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState(0);
  const [cogsPercentage, setCogsPercentage] = useState(0);
  const [fundraisingTimeline, setFundraisingTimeline] = useState(0);
  const [fundraisingAmount, setFundraisingAmount] = useState(0);
  const [monthlyCompensation, setMonthlyCompensation] = useState(0);
  const [newHiresTimeline, setNewHiresTimeline] = useState(0);
  const [nonPayrollReduction, setNonPayrollReduction] = useState(0);
  const [nonPayrollReductionTimeline, setNonPayrollReductionTimeline] =
    useState(0);

  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
        <div className="bg-secondary/50 rounded-lg p-7">
          <form className="grid gap-2">
            <Label className="font-medium text-xl">Cash Balance</Label>
            <p className="text-gray-500 text-sm">
              Current amount of cash available
            </p>
            <Input
              type="number"
              name="name"
              placeholder="$0.00"
              onChange={(e) => setCashBalance(parseInt(e.currentTarget.value))}
            />
            <span></span>
          </form>
        </div>

        <div className="bg-secondary/50 rounded-lg p-7 grid gap-2">
          <Label className="font-medium text-xl">Monthly Expenses</Label>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <form className="grid gap-2">
                <Label className="">Payroll</Label>
                <p className="text-gray-500 text-sm">
                  monthly payroll salaries and contractor payments
                </p>
                <Input
                  type="number"
                  name="name"
                  placeholder="negative number"
                  onChange={(e) => setPayRoll(parseInt(e.currentTarget.value))}
                />
              </form>
            </div>
            <div>
              <form className="grid gap-2">
                <Label className="">NonPayroll</Label>
                <p className="text-gray-500 text-sm">
                  expenses like marketing, travel, and equipment
                </p>
                <Input
                  type="number"
                  name="name"
                  placeholder="negative number"
                  onChange={(e) =>
                    setNonPayRoll(parseInt(e.currentTarget.value))
                  }
                />
              </form>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-7">
          <Label className="font-medium text-xl">Income</Label>

          <form className="monthly-income grid gap-2 pt-5">
            <Label className="">Monthly Income</Label>
            <p className="text-gray-500 text-sm">
              Current amount of cash available
            </p>
            <Input
              type="number"
              name="name"
              placeholder="$0.00"
              onChange={(e) =>
                setMonthlyIncome(parseInt(e.currentTarget.value) || 0)
              }
            />
          </form>

          <form className="growth-rate grid gap-2 pt-5">
            <Label>Monthly Growth Rate</Label>
            <p className="text-gray-500 text-sm">
              percentage increase in monthly revenue
            </p>
            <Input
              type="number"
              name="name"
              placeholder="%"
              onChange={(e) =>
                setMonthlyGrowthRate(parseInt(e.currentTarget.value) || 0)
              }
            />
          </form>
        </div>

        <div className="bg-secondary/50 rounded-lg p-7">
          <form className="grid gap-2">
            <Label className="font-medium text-xl">For best estimate</Label>
            <p className="text-gray-500 text-sm">
              Current amount of cash available
            </p>

            {/* Main container div */}
            <div
              className="p-3 gap-20 border rounded-md cursor-pointer"
              onClick={() => setShowCostOfGoodsSold(!showCostOfGoodsSold)}
            >
              <div className="flex justify-between">
                <p>Cost of Goods Sold</p>
                {/* Toggle chevron icon based on showHiddenContent state */}
                <ChevronDown
                  size={20}
                  className={showCostOfGoodsSold ? "transform rotate-180" : ""}
                />
              </div>
              {/* Conditionally render the hidden content based on showHiddenContent state */}
              {showCostOfGoodsSold && (
                <div className="p-5 bg-slate-100 m-2">
                  <form className="grid gap-2">
                    <Label className="">COGS Percentage</Label>
                    <p className="text-gray-500 text-sm">
                      Percentage of revenue spent on COGS (number).
                    </p>
                    <Input
                      type="number"
                      onClick={handleInputClick}
                      name="name"
                      placeholder="$"
                      onChange={(e) =>
                        setCogsPercentage(parseInt(e.currentTarget.value) || 0)
                      }
                    />
                  </form>
                </div>
              )}
            </div>

            <div
              className="p-3 gap-20 border rounded-md cursor-pointer"
              onClick={() => setShowFundraising(!showFundraising)}
            >
              <div className="flex justify-between">
                <p>Fundraising</p>
                {/* Toggle chevron icon based on showHiddenContent state */}
                <ChevronDown
                  size={20}
                  className={showFundraising ? "transform rotate-180" : ""}
                />
              </div>
              {/* Conditionally render the hidden content based on showHiddenContent state */}
              {showFundraising && (
                <div className="p-5 bg-slate-100 m-2">
                  <form className="pl-0 p-5 grid gap-2">
                    <Label className="">Fundraising Timeline</Label>
                    <p className="text-gray-500 text-sm">
                      Number of months until fundraising is expected
                    </p>
                    <Input
                      type="number"
                      onClick={handleInputClick}
                      name="name"
                      placeholder="$"
                      onChange={(e) =>
                        setFundraisingTimeline(
                          parseInt(e.currentTarget.value) || 0
                        )
                      }
                    />
                  </form>
                  <form className="grid gap-2">
                    <Label className="">Fundraising amount</Label>
                    <p className="text-gray-500 text-sm">
                      monthly payroll salaries and contractor payments
                    </p>
                    <Input
                      type="number"
                      onClick={handleInputClick}
                      name="name"
                      placeholder="$"
                      onChange={(e) =>
                        setFundraisingAmount(
                          parseInt(e.currentTarget.value) || 0
                        )
                      }
                    />
                  </form>
                </div>
              )}
            </div>

            <div
              className="p-3 gap-20 border rounded-md cursor-pointer"
              onClick={() => setShowHiring(!showHiring)}
            >
              <div className="flex justify-between">
                <p>Hiring</p>
                {/* Toggle chevron icon based on showHiddenContent state */}
                <ChevronDown
                  size={20}
                  className={showHiring ? "transform rotate-180" : ""}
                />
              </div>
              {/* Conditionally render the hidden content based on showHiddenContent state */}
              {showHiring && (
                <div className="p-5 bg-slate-100 m-2">
                  <form className="pt-5grid gap-2">
                    <Label className="">Monthly Compensation</Label>
                    <p className="text-gray-500 text-sm">
                      Additional monthly payroll expense expected from new
                      hires 
                    </p>
                    <Input
                      type="number"
                      onClick={handleInputClick}
                      name="name"
                      placeholder="$"
                      onChange={(e) =>
                        setMonthlyCompensation(
                          parseInt(e.currentTarget.value) || 0
                        )
                      }
                    />
                  </form>

                  <form className="pt-5 grid gap-2">
                    <Label className="">New Hires Timeline</Label>
                    <p className="text-gray-500 text-sm">
                      Number of months until new hires come on board
                    </p>
                    <Input
                      type="number"
                      onClick={handleInputClick}
                      name="name"
                      placeholder="$"
                      onChange={(e) =>
                        setNewHiresTimeline(
                          parseInt(e.currentTarget.value) || 0
                        )
                      }
                    />
                  </form>
                </div>
              )}
            </div>

            <div
              className="p-3 gap-20 border rounded-md cursor-pointer"
              onClick={() => setShowExpenseReduction(!showExpenseReduction)}
            >
              <div className="flex justify-between">
                <p>Expense Reduction</p>
                {/* Toggle chevron icon based on showHiddenContent state */}
                <ChevronDown
                  size={20}
                  className={showExpenseReduction ? "transform rotate-180" : ""}
                />
              </div>
              {/* Conditionally render the hidden content based on showHiddenContent state */}

              {showExpenseReduction && (
                <div className="p-5 bg-slate-100 m-2">
                  <form className="grid gap-2">
                    <Label className="">Non-Payroll Reduction</Label>
                    <p className="text-gray-500 text-sm">
                      Amount of planned reduction in non-payroll expenses
                    </p>
                    <Input
                      type="number"
                      onClick={handleInputClick}
                      name="name"
                      placeholder="$"
                      onChange={(e) =>
                        setNonPayrollReduction(
                          parseInt(e.currentTarget.value) || 0
                        )
                      }
                    />
                  </form>

                  <form className="grid gap-2">
                    <Label className="">Non-Payroll Reduction</Label>
                    <p className="text-gray-500 text-sm">
                      Month when non-payroll expense reduction takes effect
                    </p>
                    <Input
                      type="number"
                      onClick={handleInputClick}
                      name="name"
                      placeholder="$"
                      onChange={(e) =>
                        setNonPayrollReductionTimeline(
                          parseInt(e.currentTarget.value) || 0
                        )
                      }
                    />
                  </form>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      let cashBalance = initialCashBalance;
    let runwayMonths = 0;

    while (cashBalance > 0) {
        // Calculate monthly revenue
        let monthlyRevenue = monthlyIncome * (1 + growthRate / 100);

        // Calculate gross profit
        let grossProfit = monthlyRevenue - (monthlyRevenue * (cogsPercentage / 100));

        // Calculate net income
        let netIncome = grossProfit - (payroll + nonPayroll);

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
    </>
  );
};

export default UserInput;
