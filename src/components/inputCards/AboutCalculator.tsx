import React from "react";
import { Label } from "../ui/label";
import { NotebookPen } from "lucide-react";

function AboutTheCalculator() {
  return (
    <div className="bg-secondary/50 rounded-lg p-7 grid space-y-2">
      <Label className="font-medium text-xl text-[#FAB449]">
        Important Information
      </Label>
      <div className="flex items-center">
        <NotebookPen className="text-muted-foreground text-sm mr-2" />
        <p className="text-sm text-muted-foreground">
          Negative values represent loss or decrease.
        </p>
      </div>
      <div className="flex items-center">
        <NotebookPen className="text-muted-foreground text-sm mr-2"/>
        <p className="text-sm text-muted-foreground">
          The result is a best estimate, not the real one.
        </p>
      </div>
    </div>
  );
}

export default AboutTheCalculator;
