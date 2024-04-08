"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
const UserInput = () => {
  return (
    <>
    {/* container div */}

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
        {/* cash balance container */}
        <div className="bg-secondary/50 rounded-lg p-7  ">
          <form className="cash-balance grid gap-2">
            <Label className="font-medium text-xl">Cash Balance</Label>
            <p className="text-gray-500 text-sm ">
              Current amount of cash available
            </p>
            <Input name="name" placeholder="Your Name" />
          </form>
        </div>
        {/*  */}
        <div className=" bg-secondary/50 rounded-lg p-7  grid gap-2">
          <Label className="font-medium text-xl">Monthly Expenses</Label>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <form className="grid gap-2">
                <Label className="">Payroll</Label>
                <p className="text-gray-500 text-sm ">
                  monthly payroll salaries and contractor payments
                </p>
                <Input name="name" placeholder="Your Name" />
              </form>
            </div>
            <div>
              <form className="grid gap-2">
                <Label className="">NonPayroll</Label>
                <p className="text-gray-500 text-sm ">
                  expenses like marketing, travel, and equipment
                </p>
                <Input name="name" placeholder="Your Name" />
              </form>
            </div>
          </div>
        </div>

        <div className=" bg-secondary/50 rounded-lg p-7">
          <Label className="font-medium text-xl">Income</Label>

          <form className="grid gap-2">
            <Label className="">Monthly Income</Label>
            <p className="text-gray-500 text-sm ">
              Current amount of cash available
            </p>
            <Input name="name" placeholder="Your Name" />
          </form>

          <form className="grid gap-2">
            <Label className="">Monthly Growth Rate</Label>
            <p className="text-gray-500 text-sm ">
              percentage increase in monthly revenue
            </p>
            <Input name="name" placeholder="Your Name" />
          </form>
        </div>

        {/* optional parameters */}
        <div className="bg-secondary/50 rounded-lg p-7  ">
          <Label className="font-medium text-xl">For best estimate</Label>
          <p className="text-gray-500 text-sm ">
            providing these inputs and clear visualizations
          </p>
          {/* cost of goods input area */}
          <div className="p-3 gap-20 border rounded-md  ">
            <div className="flex justify-between ">
              <p>Cost of good sold</p>
              <ChevronDown />
            </div>

            <div className=" p-5 bg-slate-100 m-2">
              <form className="grid gap-2">
                <Label className="">Payroll</Label>
                <p className="text-gray-500 text-sm ">
                  monthly payroll salaries and contractor payments
                </p>
                <Input name="name" placeholder="Your Name" />
              </form>
            </div>
          </div>

          {/*  income growth rate chart */}
          <div className="p-3 gap-20 border rounded-md  ">
            <div className="flex justify-between ">
              <p>Hiring</p>
              <ChevronDown />
            </div>

            <div className=" p-5 bg-slate-100 m-2">
              <form className="grid gap-2">
                <Label className="">Payroll</Label>
                <p className="text-gray-500 text-sm ">
                  monthly payroll salaries and contractor payments
                </p>
                <Input name="name" placeholder="Your Name" />
              </form>
            </div>
          </div>

          {/*  */}
          <div className="p-3 gap-20 border rounded-md  ">
            <div className="flex justify-between ">
              <p>Fund raising</p>
              <ChevronDown />
            </div>

            <div className=" p-5 bg-slate-100 m-2">
              <form className="grid gap-2">
                <Label className="">Payroll</Label>
                <p className="text-gray-500 text-sm ">
                  monthly payroll salaries and contractor payments
                </p>
                <Input name="name" placeholder="Your Name" />
              </form>
            </div>
          </div>

          {/*  */}
          <div className="p-3 gap-20 border rounded-md  ">
            <div className="flex justify-between ">
              <p>Expense reduction</p>
              <ChevronDown />
            </div>

            <div className=" p-5 bg-slate-100 m-2">
              <form className="grid gap-2">
                <Label className="">Payroll</Label>
                <p className="text-gray-500 text-sm ">
                  monthly payroll salaries and contractor payments
                </p>
                <Input name="name" placeholder="Your Name" />
              </form>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default UserInput;
