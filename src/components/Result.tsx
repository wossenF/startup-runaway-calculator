/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store";
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
  }
  const {
    initialCashBalance,
    currentCashBalance,
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

  interface ProjectedRevenue {
    month: number;
    revenue: string;
  }

  const [runway, setRunway] = useState<number>(0);
  const [projectedRevenue, setProjectedRevenue] = useState<ProjectedRevenue[]>([]);

  useEffect(() => {
    // Calculate runway and projected revenue whenever the input values change
    const userInput: InputStoreState = {
      initialCashBalance,
      currentCashBalance,
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

    setRunway(calculatedRunway.runway);
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

  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);

  const chartData = {
    labels: projectedRevenue.map(data => `Month ${data.month}`),
    datasets: [
      {
        label: 'Projected Monthly Revenue',
        data: projectedRevenue.map(data => Number(data.revenue)),
        backgroundColor: 'rgba(19, 33, 60, 1)',
        borderColor: 'rgba(19, 33, 60, 1)',
      },
      {
        label: 'Current Cash Balance',
        data: projectedRevenue.map((data, index) => {
          const cashBalance = initialCashBalance - (totalBurnRate * index);
          return cashBalance.toFixed(2);
        }),
        type: 'bar',
        fill: false,
        backgroundColor: 'rgba(250, 180, 70, 1)',
        borderColor: 'rgba(250, 180, 70, 1)',
      },
    ],
  };


  return (
    <>
    <div className="my-3" id="pdf-content">
      <input
        type="number"
        name="initialCashBalance"
        value={initialCashBalance}
        onChange={(e) => setField("initialCashBalance", parseInt(e.target.value))}

      />
      {Object.values(validationErrors).map((error, index) => (
        <p key={index} style={{ color: 'red' }}>{error}</p>
      ))}
      <p>Estimated Runway: {runway} months</p>
      <BarChart datasets={chartData.datasets} labels={chartData.labels} />
      
    </div>
    <button onClick={handleDownloadClick}>Download as PDF</button>
    </>
  );
};

export default FinalResult;