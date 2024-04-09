"use client"
import UserInput from "../components/UserInput";
import {Button} from '../components/ui/button';
import  Result  from "../components/Result";
import Link from 'next/link';
export default function Home() {
  return (
    <main className=" w-3/4 m-12">
      <h1 className="font-extrabold text-4xl">Startup Runaway <span className="text-[#FAB446]">Calculator</span></h1>
      <p className="mx-auto max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl p-3 pl-0">Empower your startup journey with financial clarity. Our calculator  helps you understand your runway and make strategic decisions  effortlessly.</p>
      <UserInput/>
      <Button className="mb-4"><LinkCalculate Runaway</Button>
      <Result/>
    </main>
  );
}
