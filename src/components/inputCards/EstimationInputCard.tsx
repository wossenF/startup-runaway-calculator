"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useInputStore from "@/store/store";
import { ChevronDown } from "lucide-react";

function EstimationInputCard() {
  const setField = useInputStore((state) => state.setField);
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  // const [showExpenseReduction, setShowExpenseReduction] = useState(false);

  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Specify React.MouseEvent<HTMLDivElement> type
    event.stopPropagation();
  };
  return (
    
      <form className="grid gap-2 bg-secondary/50 rounded-lg p-7">
        <Label className="font-medium text-xl">For best estimate</Label>
        <p className="text-gray-500 text-sm"> Current amount of cash available </p>

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
                    setField("cogsPercentage", parseFloat(e.target.value) || 0);
                  }}
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
                  onChange={(e) => {
                    setField(
                      "fundraisingTimeline",
                      parseFloat(e.target.value) || 0
                    );
                  }}
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
                  onChange={(e) => {
                    setField(
                      "fundraisingAmount",
                      parseFloat(e.target.value) || 0
                    );
                  }}
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
                  Additional monthly payroll expense expected from new hires
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
              </form>
            </div>
          )}
        </div>

       
      </form>
    
  );
}

export default EstimationInputCard;
