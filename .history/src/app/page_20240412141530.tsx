"use client"
import UserInput from "../components/UserInput";
import { Button } from '../components/ui/button';
import Result from "../components/Result";
import { useState } from "react";
import RunawayCalculator from ; // Import the RunawayCalculator function

export default function Home() {
  const calculate = "Calculate Runaway";
  const back = "Back to Calculator";
  const [isClicked, setIsClicked] = useState(false);
  const [runawayMonths, setRunawayMonths] = useState(0); // State to store the calculated runaway months

  const handleOnClick = () => {
    setIsClicked(prev => !prev);
    if (!isClicked) {
      const months = RunawayCalculator(); // Call the RunawayCalculator function
      setRunawayMonths(months); // Update the state with the calculated runaway months
    }
  };

  return (
    <main className="w-3/4 m-12">
      <h1 className="font-extrabold text-4xl">
        Startup Runaway <span className="text-[#FAB446]">Calculator</span>
      </h1>
      <p className="mx-auto max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl p-3 pl-0">
        Empower your startup journey with financial clarity. Our calculator helps you understand
        your runway and make strategic decisions effortlessly.
      </p>
      {isClicked ? <Result /> : <UserInput />}
      <Button type="submit" onClick={handleOnClick}>
        {isClicked ? back : calculate}
      </Button>
      {isClicked && (
        <div className="mt-4">
          <p>Runway Months: {runawayMonths}</p>
        </div>
      )}
    </main>
  );
}
