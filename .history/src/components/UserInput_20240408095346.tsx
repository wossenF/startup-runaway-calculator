"useClient"
// Import necessary dependencies
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from './ui/input';
import { Label } from './ui/label';

const UserInput = () => {
  // Initialize useForm hook
  const { handleSubmit, register, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    // Perform actions with form data, such as sending to a server
    console.log(data);
  };

  return (
    // Wrap form with handleSubmit for form submission
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <FormField name="username" control={<Input />} rules={{ required: 'Username is required' }}>
        {/* Label for username */}
        <FormLabel as={Label}>Username</FormLabel>
        {/* Form control */}
        <FormControl>
          <Input {...register('username')} placeholder="Enter your username" />
        </FormControl>
        {/* Description for username */}
        <FormDescription>Choose a username</FormDescription>
        {/* Error message for username */}
        {errors.username && <FormMessage>{errors.username.message}</FormMessage>}
      </FormField>

      {/* Repeat the above pattern for additional form fields */}
      {/* For example, email */}
      <FormField name="email" control={<Input />} rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } }}>
        <FormLabel as={Label}>Email</FormLabel>
        <FormControl>
          <Input {...register('email')} type="email" placeholder="Enter your email" />
        </FormControl>
        <FormDescription>We'll never share your email with anyone else.</FormDescription>
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormField>

      {/* Submit button */}
      <button type="submit">Submit</button>
    </Form>
  );
};

export default UserInput;
