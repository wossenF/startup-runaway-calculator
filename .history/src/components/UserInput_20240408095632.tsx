"use client";
import {Input} from './ui/input';
import {Label} from './ui/label';

const UserInput = () => {
  return (
    <div>
      <form>
        <Label text="Name" />
        <Input name="name" placeholder="Your Name" />
        
        <br/><br/>
      </form>
    </div>
  )
}

export default UserInput
