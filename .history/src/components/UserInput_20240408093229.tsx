import React from 'react';
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from '' ; // Import the ShadowUI Input component

const Hero = () => {
  return (
    <div>
      <div>
        <Form>
          <FormField
            render={props => (
              <div>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  {/* Replace the input field with ShadowUI Input component */}
                  <Input id="name" {...props} />
                </FormControl>
                <FormDescription>Your name will be shown publicly on the site.</FormDescription>
                <FormMessage />
              </div>
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

export default Hero;
