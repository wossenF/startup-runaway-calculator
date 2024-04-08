"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import ChevronDown from 'lucide-react'
<ChevronDown />
const UserInput = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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

      <div className=" bg-secondary/50 rounded-lg p-7  grid gap-2">
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
          <Input name="name" placeholder="Your Name" />
        </form>
      </div>
    </div>
  );
};

export default UserInput;
