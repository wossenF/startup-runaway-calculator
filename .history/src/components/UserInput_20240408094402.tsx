import React from 'react';
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from './ui/input';
import { Label } from './ui/label'; // Update the path to your Label component

const UserInput = () => {
  return (
    <div>
      <Form>
        <FormField name="username" control={<Input />} rules={{ required: true }}>
          <FormLabel as={Label}>Username</FormLabel>
          <FormControl>
            <Input />
          </FormControl>
          <FormDescription>Enter your username</FormDescription>
          <FormMessage />
        </FormField>
      </Form>
    </div>
  )
}

export default UserInput;
