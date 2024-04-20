"use client"
import { useState } from "react";
import UserInput from "../components/UserInput";
import FinalResult from "../components/Result";
import useInputStore from "@/store/store";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(prevState => !prevState);
  };

  const {
    initialCashBalance,
    monthlyIncome,

  } = useInputStore();

  return (
    <main className="w-3/4 m-12">

      <h1 className="font-extrabold text-4xl">
        Startup Runaway <span className="text-[#FAB446]">Calculator</span>
      </h1>

      <p className="pb-7 mx-auto max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl p-3 pl-0">
        Empower your startup journey with financial clarity. Our calculator helps you understand
        your runway and make strategic decisions effortlessly.
      </p>

      {isClicked ? <FinalResult /> : <UserInput />}

      <button disabled={!initialCashBalance && !monthlyIncome} className="bg-[#13213C] rounded-md text-primary-foreground hover:bg-primary/90 p-3 my-5" onClick={handleClick}>
        {isClicked ? "Back to Calculator" : "Calculate Runaway"}
      </button>
      {!isClicked && !initialCashBalance && !monthlyIncome && <div className="text-red-500">Please don't forget to add value for the required fields(*)</div>}
    </main>
  );
}
