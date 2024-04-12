import React, { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import Result from './Result';
import {Button} from './ui/button'

const UserInput = () => {
  const inputData={
    initialCashBalance: 0,
    payRoll: 0,
    nonPayRoll: 0,
    monthlyIncome: 0,
    monthlyGrowthRate: 0,
    cogsPercentage: 0,
    fundraisingTimeline: 0,
    fundraisingAmount: 0,
    monthlyCompensation: 0,
    newHiresTimeline: 0,
    nonPayrollReduction: 0,
    nonPayrollReductionTimeline: 0
    
  }
  const [formData,setFormData]=useState(inputData);
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);

  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
  };
  const calculate = "Calculate Runaway"
  const back = "Back to Calculator"
  const [isClicked, setIsClicked] = useState(false)
  const handleOnclick = () => {
    setIsClicked((prev) => (!prev))
  }
  
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
              placeholder="Enter value"
              onChange={(e) => setFormData({...formData,initialCashBalance:parseInt(e.currentTarget.value) || 0})}
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
                  placeholder="Enter value"
                  onChange={(e) => setFormData({...formData,payRoll:parseInt(e.currentTarget.value) || 0})}
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
                  placeholder="Enter value"
                  onChange={(e) =>
                    setFormData({ ...formData, nonPayRoll: parseInt(e.currentTarget.value) || 0 } )
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
              placeholder="Enter value"
              onChange={(e) =>
                setFormData({ ...formData, monthlyIncome: parseInt(e.currentTarget.value) || 0 } )
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
              placeholder="Enter value"
              onChange={(e) =>
                setFormData({ ...formData, monthlyGrowthRate: parseInt(e.currentTarget.value) || 0 } )
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

            <div
              className="p-3 gap-20 border rounded-md cursor-pointer"
              onClick={() => setShowCostOfGoodsSold(!showCostOfGoodsSold)}
            >
              <div className="flex justify-between">
                <p>Cost of Goods Sold</p>
                <ChevronDown
                  size={20}
                  className={showCostOfGoodsSold ? "transform rotate-180" : ""}
                />
              </div>
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
                      placeholder="Enter value"
                      onChange={(e) =>
                        setFormData({ ...formData, cogsPercentage : parseInt(e.currentTarget.value) || 0 } )
                      }
                    />
                  </form>
                </div>
              )}
            </div>

            {/* Similar blocks for Fundraising, Hiring, and Expense Reduction */}
          </form>
        </div>
      </div>
      <Button type="submit" onClick={handleOnclick}>{isClicked ? back : calculate}</Button>
      {isClicked ? <Result /> : null}
    </>
  );

};

export default UserInput;
