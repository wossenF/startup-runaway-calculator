import React from 'react';
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./ui/form";
const UserInput = () => {
  return (
    <div>
      <div>
      <Form>
        <FormField
        render(props)={useFormField("name", props)}
          label="Name"
          description="Your name will be shown publicly on the site."     
        />
      </Form>
      </div>
      <div>
      <form >input three</form>
      <form >input four</form>
      </div>
    </div>
  )
}

export default userIn
