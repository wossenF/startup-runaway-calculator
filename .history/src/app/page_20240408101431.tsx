import UserInput from "../components/UserInput";

export default function Home() {
  return (
    <main className="ml-24 w-3/4 mx-auto">
      <h1 className="font-extrabold text-4xl">Startup Runaway <span className="text-[#FAB446]">Calculator</span></h1>
      <p Empower your startup journey with financial clarity. Our calculator  helps you understand your runway and make strategic decisions  effortlessly.</p>
      <UserInput/>
    </main>
  );
}
