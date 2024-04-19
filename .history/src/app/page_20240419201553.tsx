"use client"
import { useState } from "react";
import UserInput from "../components/UserInput";
// import { Button } from "../components/ui/button";
import MyComponent from "../components/Result";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(prevState => !prevState);
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
      {isClicked ? <MyComponent /> : <UserInput />}
      <button className=" onClick={handleClick}>
        {isClicked ? "Back to Calculator" : "Calculate Runaway"}
      </button>
    </main>
  );
}
