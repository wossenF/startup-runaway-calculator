"use client";
import { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import useInputStore from "../store/store";
import { ZodError, any, boolean } from "zod";
import {validation}
interface Errors {
  [key: string]: boolean;
}
const UserInput = () => {
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);
  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const setField = useInputStore((state) => state.setField);
  const validationErrors = useInputStore((state) => state.validationErrors);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (field: any, value: string) => {
    try {
      setField(field, parseFloat(value)); // Parse and set the value
    } catch (error) {
      if (error instanceof ZodError) {
        // Check if it's a ZodError
        console.error("Zod Validation Error:", error);
        // Update errors state with a user-friendly message
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "Please enter a valid number",
        }));
      } else {
        throw error; // Re-throw other errors
      }
    }
  };

  type InputStoreState = ReturnType<typeof useInputStore>;
  const validateField = (field: keyof InputStoreState) => {
    const value = useInputStore((state) => state[field]);
    if (isNaN(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
        <div className="cash-balance bg-secondary/50 rounded-lg p-7">
          <form className="grid gap-2">
            <Label className="font-medium text-xl">Cash Balance</Label>
            <p className="text-gray-500 text-sm">
              Current amount of cash available
            </p>
            <Input
              type="number"
              name="name"
              placeholder="$1000,000"
              // value={useInputStore((state) => state.initialCashBalance)}
              onChange={(e) =>
                setField("initialCashBalance", parseFloat(e.target.value))
              }
            />
            {errors.initialCashBalance && (
              <span className="text-[#Ff0000]">
                error: {errors.initialCashBalance}
              </span>
            )}
          </form>
        </div>

        <div className="monthly-expense bg-secondary/50 rounded-lg p-7 grid gap-2">
          <Label className="font-medium text-xl">Monthly Expenses</Label>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <form className="grid gap-2">
              <Label className="">Payroll</Label>
              <p className="text-gray-500 text-sm">
                monthly payroll salaries and contractor payments
              </p>
              <Input
                type="number"
                name="name"
                placeholder="negative number"
                onChange={(e) => {
                  setField("payRoll", parseFloat(e.target.value));
                }}
              />
              {errors.payRoll && (
                <span className="text-[#Ff0000]">error: {errors.payRoll}</span>
              )}
            </form>
            <form className="grid gap-2">
              <Label className="">NonPayroll</Label>
              <p className="text-gray-500 text-sm">
                expenses like marketing, travel, and equipment
              </p>
              <Input
                type="number"
                name="name"
                placeholder="negative number"
                onChange={(e) => {
                  setField("nonPayRoll", parseFloat(e.target.value) || 0);
                }}
              />
              {errors.nonPayRoll && (
                <span className="text-[#Ff0000]">
                  error: {errors.nonPayRoll}
                </span>
              )}
            </form>
          </div>
        </div>

        <div className="income bg-secondary/50 rounded-lg p-7">
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
              onChange={(e) => {
                setField("monthlyIncome", parseFloat(e.target.value) || 0);
              }}
            />
            {errors.monthlyIncome && (
              <span className="text-[#Ff0000]">
                error: {errors.monthlyIncome}
              </span>
            )}
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
              onChange={(e) => {
                setField("monthlyGrowthRate", parseFloat(e.target.value) || 0);
              }}
            />
            {errors.monthlyGrowthRate && (
              <span className="text-[#Ff0000]">
                error: {errors.monthlyGrowthRate}
              </span>
            )}
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
                      onChange={(e) => {
                        setField(
                          "cogsPercentage",
                          parseFloat(e.target.value) || 0
                        );
                      }}
                    />
                    {errors.cogsPercentage && (
                      <span className="text-[#Ff0000]">
                        error: {errors.cogsPercentage}
                      </span>
                    )}
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
                      onChange={(e) => {
                        setField(
                          "fundraisingTimeline",
                          parseFloat(e.target.value) || 0
                        );
                      }}
                    />
                    {errors.fundraisingTimeline && (
                      <span className="text-[#Ff0000]">
                        {errors.fundraisingTimeline}
                      </span>
                    )}
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
                      onChange={(e) => {
                        setField(
                          "fundraisingAmount",
                          parseFloat(e.target.value) || 0
                        );
                      }}
                    />
                    {errors.fundraisingAmount && (
                      <span className="text-[#Ff0000]">
                        error: {errors.fundraisingAmount}
                      </span>
                    )}

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
                      onChange={(e) => {
                        setField(
                          "monthlyCompensation",
                          parseFloat(e.target.value) || 0
                        );
                      }}
                    />
                    {
                      errors.monthlyCompensation && (
                        <span className="text-red-500">{errors.monthlyCompensation}</span>
                      )
                    }
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
                      onChange={(e) => {
                        setField(
                          "newHiresTimeline",
                          parseFloat(e.target.value) || 0
                        );
                      }}
                    />
                    {
                      errors.newHiresTimeline && (
                        <span className="text-red-500">{errors.newHiresTimeline}</span>
                      )
                    }
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
                      onChange={(e) => {
                        setField(
                          "nonPayrollReduction",
                          parseFloat(e.target.value) || 0
                        );
                      }}
                    />
                    {
                      errors.nonPayrollReduction && (
                        <span className="text-red-500">{errors.nonPayrollReduction}</span>
                      )
                    }
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
                      onChange={(e) => {
                        setField(
                          "nonPayrollReductionTimeline",
                          parseFloat(e.target.value) || 0
                        );
                      }}
                    />
                    {
                      errors.nonPayrollReductionTimeline && (
                        <span className="text-red-500">{errors.nonPayrollReductionTimeline}</span>
                      )
                    }
                  </form>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInput;

