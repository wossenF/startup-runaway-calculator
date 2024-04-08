import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from './ui/input';
import { Label } from './ui/label';

type FormValues = {
  username: string;
  email: string;
};

const UserInput: React.FC = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField name="username" control={<Input />} rules={{ required: 'Username is required' }}>
        <FormLabel as={Label}>Username</FormLabel>
        <FormControl>
          <Input {...register('username')} placeholder="Enter your username" />
        </FormControl>
        <FormDescription>Choose a username</FormDescription>
        {errors.username && <FormMessage>{errors.username.message}</FormMessage>}
      </FormField>

      <FormField name="email" control={<Input />} rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } }}>
        <FormLabel as={Label}>Email</FormLabel>
        <FormControl>
          <Input {...register('email')} type="email" placeholder="Enter your email" />
        </FormControl>
        <FormDescription>We'll never share your email with anyone else.</FormDescription>
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormField>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default UserInput;
