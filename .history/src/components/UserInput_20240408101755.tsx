"use client";
import {Input} from './ui/input';
import {Label} from './ui/label';

const UserInput = () => {
  return (
    <div>
      <div>
      <form>
        <Label>Name</Label>
        <Input name="name" placeholder="Your Name" />
      </form>
      </div>

      
    </div>
  )
}

export default UserInput
