"use client";
import {Input} from './ui/input';
import {Label} from './ui/label';

const UserInput = () => {
  return (
    <div>
      <form>
        <Label text=""/>
        <Input name="name" placeholder="Your Name" />
        
        <br/><br/>
        
        <Label text="Email Address" />
      </form>
    </div>
  )
}

export default UserInput
