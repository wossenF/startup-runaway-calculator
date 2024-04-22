/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../store/store";
import { calculateRunway, calculateProjectedRevenue } from '../utils/calculations';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ApexCharts, { ApexOptions } from 'apexcharts';

const FinalResult = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts>();
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
    currentCashBalance,
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
      validationErrors,
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
    validationErrors,
  ]);

  const totalBurnRate = monthlyIncome - (payRoll + nonPayRoll);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // ...

      const options: ApexOptions = {
        chart: {
          type: 'line',
          height: 400,
        },
        series: [
          {
            name: 'Projected Monthly Revenue',
            data: projectedRevenue.map((data) => Number(data.revenue)),
          },
          {
            name: 'Current Cash Balance',
            data: projectedRevenue.map((data, index) => {
              const cashBalance = initialCashBalance - totalBurnRate * index;
              return Number(cashBalance.toFixed(2)); // Convert the calculated value to a number explicitly
            }),
            type: 'bar',
          },
        ],
        xaxis: {
          categories: projectedRevenue.map((data) => `Month ${data.month}`),
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: function (val) {
              return val.toFixed(2);
            },
          },
        },
        dataLabels: {
          enabled: false, // Hide the data values
        },
        markers: {
          size: 6, // Set the size of the markers
          colors: ['#ffffff'], // Set the color of the markers
          strokeColors: '#000000', // Set the color of the stroke around the markers
          strokeWidth: 2, // Set the width of the stroke around the markers
        },
        colors: ['rgba(19, 33, 60, 1)', 'rgba(250, 180, 70, 1)'], // Set the colors for the bars
      };
      

// ...
      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
    }
  }, [projectedRevenue]);

  return (
    <>
      <div className="my-3 space-y-4" id="pdf-content">
        <input
          type="number"
          name="initialCashBalance"
          value={initialCashBalance}
          onChange={(e) => setField("initialCashBalance", parseInt(e.target.value))}
        />
        {Object.values(validationErrors).map((error, index) => (
          <p key={index} style={{ color: 'red' }}>{error}</p>
        ))}
        <p>Estimated Runway: {runway || ""} months</p>
        <div ref={chartRef}></div>
      </div>
      <button className="bg-[#13213C] rounded-md text-primary-foreground hover:bg-primary/90 p-3 mr-3 my-5" onClick={handleDownloadClick}>Download as PDF</button>
    </>
  );
};

export default FinalResult;
