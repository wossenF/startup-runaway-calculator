
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDown } from "lucide-react";

const UserInput = () => {
  const [showSection, setShowSection] = useState({
    costOfGoodsSold: false,
    fundraising: false,
    hiring: false,
    expenseReduction: false,
  });

  const toggleSection = (section) => {
    setShowSection((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-5">
      {/* Your other sections */}
      {/* Cash Balance */}
      <div className="bg-secondary/50 rounded-lg p-7">
        <form className="grid gap-2">
          <Label className="font-medium text-xl">Cash Balance</Label>
          <p className="text-gray-500 text-sm">
            Current amount of cash available
          </p>
          <Input name="name" placeholder="Your Name" />
        </form>
      </div>

      {/* Other sections */}

      {/* For best estimate */}
      <div className="bg-secondary/50 rounded-lg p-7">
        <form className="grid gap-2">
          <Label className="font-medium text-xl">For best estimate</Label>
          <p className="text-gray-500 text-sm">
            Current amount of cash available
          </p>

          {/* Main container div */}
          {Object.keys(showSection).map((section) => (
            <div
              key={section}
              className="p-3 gap-20 border rounded-md cursor-pointer"
              onClick={() => toggleSection(section)}
            >
              <div className="flex justify-between">
                <p>{section.replace(/([A-Z])/g, ' $1').trim()}</p>
                {/* Toggle chevron icon based on showSection state */}
                <ChevronDown
                  size={20}
                  className={showSection[section] ? "transform rotate-180" : ""}
                />
              </div>
              {/* Conditionally render the hidden content based on showSection state */}
              {showSection[section] && (
                <div className="p-5 bg-slate-100 m-2">
                  <form className="grid gap-2">
                    <Label className="">
                      {section.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <p className="text-gray-500 text-sm">
                      Placeholder text for {section}
                    </p>
                    <Input name="name" placeholder="Your Name" />
                  </form>
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default UserInput;
