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
} from "@components/ui"
const Hero = () => {
  return (
    <div>
      <div>
      <Form>
  <FormField
    control={...}
    name="..."
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
          { /* Your form field */}
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
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

export default Hero
