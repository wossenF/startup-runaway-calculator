import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../../store/store";
import TableResult from "./TableResult";

import {
  calculateRunway,
  calculateProjectedRevenue,
} from "../../utils/calculations";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Input } from "../ui/input";
const FinalResult = () => {
  const handleDownloadClick = () => {
    const input = document.getElementById("pdf-content");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("my_page.pdf");
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
    setField,
  } = useInputStore();

  // const [runway, setRunway] = useState<number>(0);
  const [projectedRevenue, setProjectedRevenue] = useState<
    { month: number; revenue: string }[]
  >([]);

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
      validationErrors,
      currentCashBalance: 0,
      firstMonthBalance: 0,
      secondMonthBalance: 0,
      thirdMonthBalance: 0,
      burnRate: 0,
      runway: 0
    };

    const calculatedRunway = calculateRunway(userInput);

    const calculatedProjectedRevenue = calculateProjectedRevenue(userInput, 6);

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
    validationErrors,
  ]);

  const totalBurnRate =
    cogsPercentage * monthlyIncome -
    payRoll -
    nonPayRoll +
    monthlyCompensation * newHiresTimeline +
    nonPayrollReduction * nonPayrollReductionTimeline;

  const chartData = {
    labels: projectedRevenue.map((data) => `Month ${data.month}`),
    datasets: [
      {
        label: "Projected Monthly Revenue",
        data: projectedRevenue.map((data) => Number(data.revenue)),
        backgroundColor: "rgba(19, 33, 60, 1)",
        borderColor: "rgba(19, 33, 60, 1)",
      },
      {
        label: "Current Cash Balance",
        data: projectedRevenue.map((data, index) => {
          const cashBalance = initialCashBalance - totalBurnRate * index;
          return cashBalance.toFixed(2);
        }),
        type: "bar",
        fill: false,
        backgroundColor: "rgba(250, 180, 70, 1)",
        borderColor: "rgba(250, 180, 70, 1)",
      },
    ],
  };
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };
  const runway = useInputStore((state) => state.runway);
  const initialCostValue = useInputStore((state) => state.initialCashBalance);
  console.log(">>>> updated initial cost", initialCostValue);
  return (
    <>
      <div id="pdf-content">
        <div className="my-3 space-y-4 flex flex-cols justify-between">
          <div>
            <Input
              className="w-full rounded-none p-3 mb-1"
              type="number"
              name="initialCashBalance"
              value={initialCostValue}
              onChange={(e) =>
                setField("initialCashBalance", parseInt(e.target.value))
              }
            />
            {Object.values(validationErrors).map((error, index) => (
              <p key={index} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </div>
          <button
            className="bg-[#FAB446]  text-primary-foreground hover:bg-primary/90 px-3"
            onClick={handleClick}
          >
            {isClicked ? "Chart" : "Table"}
          </button>
        </div>
        <p className="mb-5">Estimated Runway: {runway || ""} months</p>
        {isClicked ? (
          <TableResult />
        ) : (
          <BarChart datasets={chartData.datasets} labels={chartData.labels} />
        )}
      </div>
      <button
        className="bg-[#13213C] rounded-sm text-primary-foreground hover:bg-primary/90 p-2 mr-2 my-3"
        onClick={handleDownloadClick}
      >
        Download as PDF
      </button>
    </>
  );
};

export default FinalResult;
