import React from "react";
import { Label } from "../ui/label";


function AboutTheCalculator() {
  return (
    <div className="bg-secondary/50 rounded-lg p-7 grid gap-2">
      <Label className="font-medium text-xl">things you have to know</Label>
      <p>negative values representing decreasing or loss</p>
      <p>it estimate best value not the exact </p>
    </div>
  );
}

export default AboutTheCalculator;
