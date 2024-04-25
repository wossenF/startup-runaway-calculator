"use client";
import { useState } from "react";
import UserInput from "../components/UserInput";
import useInputStore from "@/store/store";
import { ResultDashBoard } from "@/components/Result/ResultDashBoard";
import { useInputValidation } from "@/validation/inputValidation";
import { stat } from "fs";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const { initialCashBalance, monthlyIncome } = useInputStore();
  // const error = useInputValidation()
  const error = useInputStore((state) => state.error);

  console.log(">>>>>>>>>>>> error <<<<<<", error)

  // Check if there's an error message
  const { errorMessage: cashBalanceError } =
    useInputValidation("initialCashBalance");
  const { errorMessage: incomeError } = useInputValidation("monthlyIncome");

  const handleClick = () => {
    // Only toggle if there are no errors
    if (!error) {
      setIsClicked((prevState) => !prevState);
    }
  };

  return (
    <main className="w-3/4 m-12">
      <h1 className="font-extrabold text-4xl">
        Startup Runaway <span className="text-[#FAB446]">Calculator</span>
      </h1>

      <p className="pb-7 max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl p-3 pl-0">
        Empower your startup journey with financial clarity. Our calculator
        helps you understand your runway and make strategic decisions
        effortlessly.
      </p>
      {
        // Render ResultDashBoard only if there are no errors
        isClicked ? <ResultDashBoard /> : <UserInput />
      }
      <button
        disabled={!!cashBalanceError || !!incomeError || error !== ""} // Disable if there's an error
        // Disable if there's an error or no value inserted
        className="bg-[#13213C] rounded-md text-primary-foreground hover:bg-primary/90 p-3 my-5"
        onClick={handleClick}
      >
        {isClicked ? "Back to Calculator" : "Calculate Runaway"}
      </button>
      {(!initialCashBalance || !monthlyIncome) &&
        !cashBalanceError &&
        !incomeError && (
          // Show error only if there are no other errors
          <div className="text-red-500">
            Please insert a valid data before calculating
          </div>
        )}
    </main>
  );
}
