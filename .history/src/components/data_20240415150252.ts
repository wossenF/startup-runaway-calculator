"use client"
import { MouseEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";
import useInputStore, { ValidationErrors } from "../store/store"; // Import ValidationErrors type from store

interface Errors {
  [key: string]: boolean;
}

const RunawayCalculator = () => {
  const [showCostOfGoodsSold, setShowCostOfGoodsSold] = useState(false);
  const [showFundraising, setShowFundraising] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showExpenseReduction, setShowExpenseReduction] = useState(false);
  const handleInputClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const setField = useInputStore((state) => state.setField);
  const validationErrors: ValidationErrors = useInputStore((state) => state.validationErrors); // Define validationErrors type

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (field: any, value: string) => {
    try {
      setField(field, parseFloat(value)); // Parse and set the value
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false })); // Clear any previous errors
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true })); // Set error state to true if parsing fails
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
        <div className="cash-balance bg-secondary/50 rounded-lg p-7">
          <form className="grid gap-2">
            <Label className="font-medium text-xl">Cash Balance</Label>
            <p className="text-gray-500 text-sm">
              Current amount of cash available
            </p>
            <Input
              type="number"
              name="name"
              placeholder="$1000,000"
              onChange={(e) => handleInputChange("initialCashBalance", e.target.value)}
            />
            {validationErrors.initialCashBalance && (
              <span className="text-[#Ff0000]">
                error: {validationErrors.initialCashBalance}
              </span>
            )}
          </form>
        </div>

        {/* Other sections */}
      </div>
    </>
  );
};

export default RunawayCalculator;
