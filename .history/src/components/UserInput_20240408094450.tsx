import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from './ui/input';
import { Label } from './path/to/Label'; // Update the path to your Label component

const UserInput = () => {
  const { handleSubmit, formState: { errors }, register } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField name="username" control={<Input />} rules={{ required: true }}>
          <FormLabel as={Label}>Username</FormLabel>
          <FormControl>
            <Input {...register("username")} />
          </FormControl>
          <FormDescription>Enter your username</FormDescription>
          {errors.username && <FormMessage>{errors.username.message}</FormMessage>}
        </FormField>
        {/* Add more form fields as needed */}
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

export default UserInput;
