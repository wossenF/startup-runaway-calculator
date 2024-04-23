/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store";
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';
import jsPDF from 'jspdf';
import ReactApexChart from "react-apexcharts";
import html2canvas from 'html2canvas';
import Chart, { DataPoint } from "./Chart";

const FinalResult = () => {

  const handleDownloadClick = () => {
    const input = document.getElementById('pdf-content');

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('my_page.pdf');
      });
    }
  };

  const {
    initialCashBalance,
    monthlyIncome,
    monthlyGrowthRate,
    cogsPercentage,
    payRoll,
    nonPayRoll,
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline,
    newHiresTimeline,
    validationErrors,
    setField
  } = useInputStore();

  // const [runway, setRunway] = useState<number>(0);
  const [projectedRevenue, setProjectedRevenue] = useState<DataPoint[]>([]);

  useEffect(() => {
    const userInput: InputStoreState = {
      initialCashBalance,
      monthlyIncome,
      monthlyGrowthRate,
      cogsPercentage,
      payRoll,
      nonPayRoll,
      fundraisingAmount,
      monthlyCompensation,
      nonPayrollReduction,
      nonPayrollReductionTimeline,
      fundraisingTimeline,
      newHiresTimeline,
      validationErrors
    };

    const calculatedRunway = calculateRunway(userInput);

    const calculatedProjectedRevenue = calculateProjectedRevenue(userInput, 12);

    // setRunway(calculatedRunway.runway);

    setProjectedRevenue(calculatedProjectedRevenue);

  }, [
    initialCashBalance,
    monthlyIncome,
    monthlyGrowthRate,
    cogsPercentage,
    payRoll,
    nonPayRoll,
    fundraisingAmount,
    monthlyCompensation,
    nonPayrollReduction,
    nonPayrollReductionTimeline,
    fundraisingTimeline,
    newHiresTimeline,
    validationErrors
  ]);

  const runway = useInputStore((state) => state.runway);

  const initialCostValue = useInputStore((state) => state.initialCashBalance)

  console.log(">>>> updated initial cost", runway);

  return (
    <>
      <div className="my-3 space-y-4" id="pdf-content">
        
        <input
          type="number"
          name="initialCashBalance"
          value={initialCostValue}
          onChange={(e) => setField("initialCashBalance", parseInt(e.target.value))}
        />

        {Object.values(validationErrors).map((error, index) => (
          <p key={index} style={{ color: 'red' }}>{error}</p>
        ))}

        <p>Estimated Runway: {runway || ""} months</p>

        <Chart datasets={projectedRevenue} />

      </div>

      <button className="bg-[#13213C] rounded-md text-primary-foreground hover:bg-primary/90 p-3 mr-3 my-5" onClick={handleDownloadClick}>Download as PDF</button>
    </>
  );
};

export default FinalResult;
