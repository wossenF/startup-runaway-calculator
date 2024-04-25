import { useState } from "react";
import useInputStore, { InputStoreState } from "@/store/store";

export const useInputValidation = (fieldName?: string ) => {
  const setField = useInputStore((state) => state.setField);
  const [errorMessage, setErrorMessage] = useState("");
  const error = useInputStore((state)=> state.setError)
  const {initialCashBalance, monthlyIncome, payRoll, nonPayRoll} = useInputStore((state) => state);
  
  const handleInputChange = (value: any, e?: React.FormEvent<HTMLInputElement>) => {
    e?.preventDefault()

    const inputValue = value?.trim().toLowerCase();
    let numericValue;

    if (/^\d+(\.\d+)?(k|m|b|t)?$/i.test(inputValue)) {
      numericValue = parseFloat(inputValue);

      if (inputValue.endsWith("k")) {
        numericValue *= 1000;
      } else if (inputValue.endsWith("m")) {
        numericValue *= 1000000;
      } else if (inputValue.endsWith("b")) {
        numericValue *= 1000000000;
      } else if (inputValue.endsWith("t")) {
        numericValue *= 1000000000000;
      }

      error("");
      
      setField(fieldName as keyof InputStoreState, numericValue);
      
    } else {
      error(
        "Invalid input format. Please enter a valid number."
      );
    }
  };

  return {
    handleInputChange,
    errorMessage
  };
};
