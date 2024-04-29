"use client";
import { useState } from "react";
import UserInput from "../components/UserInput";
import useInputStore from "@/store/store";
import { ResultDashBoard } from "@/components/Result/ResultDashBoard";
import { useInputValidation } from "@/validation/inputValidation";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const initialCostValue = useInputStore((state) => state.initialCashBalance);
  const firstMonthBalance = useInputStore((state) => state.firstMonthBalance);
  const firstMonthexpense = useInputStore((state) => state.firstMonthexpense);
  const secondMonthexpense = useInputStore((state) => state.secondMonthexpense);
  const thirdMonthexpense = useInputStore((state) => state.thirdMonthexpense);
  const secondMonthBalance = useInputStore((state) => state.secondMonthBalance);
  const thirdMonthBalance = useInputStore((state) => state.thirdMonthBalance);
  

  console.log(">>>>> initial state: ", initialCostValue);

  const error = useInputStore((state) => state.error);

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
        disabled={!initialCostValue || !firstMonthBalance || !firstMonthexpense || !secondMonthexpense || 
          !thirdMonthexpense || !secondMonthBalance || !thirdMonthBalance || !secondMonthBalance || !thirdMonthBalance
        } // Disable if there's an error
        // Disable if there's an error or no value inserted
        // className="bg-[#13213C] disabled:bg-gray-400 cursor-not-allowed rounded-md text-primary-foreground hover:bg-primary/90 p-3 my-5"
        className={`bg-[#13213C] rounded-md text-primary-foreground hover:bg-primary/90 p-3 my-5 ${
          !initialCostValue || !firstMonthBalance || !firstMonthexpense
            ? "disabled:bg-gray-400 cursor-not-allowed"
            : ""
        }`}
        onClick={handleClick}
      >
        {isClicked ? "Back to Calculator" : "Calculate Runaway"}
      </button>

      {!initialCostValue ||
        !firstMonthBalance ||
        (!firstMonthexpense && (
          <p className="text-red-500 text-sm">{`Please fill the required field`}</p>
        ))}
    </main>
  );
}
