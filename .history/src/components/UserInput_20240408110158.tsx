"use client";
import {Input} from './ui/input';
import {Label} from './ui/label';

const UserInput = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="bg-secondary/50 rounded-lg p-7  ">
      <form className="grid gap-2">
        <Label className='font-medium text-xl'>Cash Balance</Label>
        <p className="text-gray-500 text-sm ">Current amount of cash available</p>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>

      <div className="bg-secondary/50 rounded-lg p-7  ">
      <div>
      <form className="grid gap-2">
        <Label className='font-medium text-xl'>Monthly expenses</Label>
        <p className="text-gray-500 text-sm ">Current amount of cash available</p>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>
      <div></div>
      </div>


      <div className="bg-secondary/50 rounded-lg p-7  ">
      <form className="grid gap-2">
        <Label className='font-medium text-xl'>Income</Label>
        <p className="text-gray-500 text-sm ">Current amount of cash available</p>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>


      <div className="bg-secondary/50 rounded-lg p-7  ">
      <form className="grid gap-2">
        <Label className='font-medium text-xl'>For best estimate</Label>
        <p className="text-gray-500 text-sm ">Current amount of cash available</p>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>

    </div>
  )
}

export default UserInput
