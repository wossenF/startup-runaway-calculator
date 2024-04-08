"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import {Button} from "./ui/button"
const UserInput = () => {
  return (
    <>
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
      <div className="bg-secondary/50 rounded-lg p-7  ">
        <form className="grid gap-2">
          <Label className="font-medium text-xl">Cash Balance</Label>
          <p className="text-gray-500 text-sm ">
            Current amount of cash available
          </p>
          <Input name="name" placeholder="Your Name" />
        </form>
      </div>

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

      <div className=" bg-secondary/50 rounded-lg p-7  grid ">
        <Label className="font-medium text-xl">Income</Label>
        <div className="grid gap-3 pt-1">
          <div>
            <form className="grid gap-2">
              <Label className="">Monthly Income</Label>
              <p className="text-gray-500 text-sm ">
                Current amount of cash available
              </p>
              <Input name="name" placeholder="Your Name" />
            </form>
          </div>
          <div>
            <form className="grid gap-2">
              <Label className="">Monthly Growth Rate</Label>
              <p className="text-gray-500 text-sm ">
                percentage increase in monthly revenue
              </p>
              <Input name="name" placeholder="Your Name" />
            </form>
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-lg p-7  ">
        <form className="grid gap-2">
          <Label className="font-medium text-xl">For best estimate</Label>
          <p className="text-gray-500 text-sm ">
            Current amount of cash available
          </p>
          <div className="p-3 gap-20 border rounded-md  ">
            <div className="flex justify-between ">
              <p>Cost of good </p>
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
          <div className="flex justify-between p-3 gap-20 border rounded-md  ">
            <p>Hiring</p>
            <ChevronDown />
          </div>
          <div className="flex justify-between p-3 gap-20 border rounded-md  ">
            <p>Expense Reduction</p>
            <ChevronDown />
          </div>
          <div className="flex justify-between p-3 gap-20 border rounded-md  ">
            <p>Fundraising</p>
            <ChevronDown />
          </div>
        </form>
      </div>
    </div>
    
    </>
  );
};

export default UserInput;
