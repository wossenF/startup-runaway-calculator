"use client";
import {Input} from './ui/input';
import {Label} from './ui/label';

const UserInput = () => {
  return (
    <div>
      <div className="cash-balance">
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>
      <div className="expenditure">
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>
      <div>
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div >
      <div className="cash-balance">
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>

      
    </div>
  )
}

export default UserInput
