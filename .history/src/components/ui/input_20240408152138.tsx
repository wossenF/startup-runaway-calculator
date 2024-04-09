import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // State to manage focus state
    const [isFocused, setIsFocused] = useState(false);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isFocused ? "focus:border-#FAB446" : "", // Conditionally apply focus border color
          className
        )}
        ref={ref}
        onFocus={() => setIsFocused(true)} // Set isFocused to true on focus
        onBlur={() => setIsFocused(false)} // Set isFocused to false on blur
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
