"use client";
import {Input} from './ui/input';
import {Label} from './ui/label';

const UserInput = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="cash-balance ">
      <form>
        <Label className='font-medium text-xl'>Cash Balance</Label>
        <p className="text-gray-500">Current amount of cash available</p>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>
      <div className="expenditure">
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>
      <div className="income">
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div >
      <div className="optionals">
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>
    </div>
  )
}

export default UserInput
