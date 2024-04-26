import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import useInputStore, { InputStoreState } from "../../store/store";
import TableResult from "./TableResult";
import { calculateRunway } from "../../utils/calculations";
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
    firstMonthBalance,
    secondMonthBalance,
    thirdMonthBalance,
    firstMonthexpense,
    secondMonthexpense,
    thirdMonthexpense,
    validationErrors,
    setField,
    currentCashBalance,
    runway,
    eachmonthsIncome
  } = useInputStore();

  // const [run, setRunway] = useState<any>(0);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const userInput: InputStoreState = {
      eachmonthsIncome: '',
      growthRate: 0,
      burnRate: 0,
      expenseRate: 0,
      initialCashBalance,
      firstMonthBalance,
      secondMonthBalance,
      thirdMonthBalance,
      firstMonthexpense,
      secondMonthexpense,
      thirdMonthexpense,
      validationErrors,
      currentCashBalance: "",
      error: "",
      runway: 0,
      monthsRemaining: "",
      totalBurnRate: 0,
      IncomegrowthRateDecimal: 0,
      expensesgrowthRateDecimal: 0,
      
    };

    const calculatedRunway = calculateRunway(userInput);
    // setRunway(calculatedRunway.runway);
  }, [
    initialCashBalance,
    firstMonthBalance,
    secondMonthBalance,
    thirdMonthBalance,
    firstMonthexpense,
    secondMonthexpense,
    thirdMonthexpense,
    validationErrors,

  ]);

  const initialCostValue = useInputStore((state) => state.initialCashBalance);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const chartData = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Monthly Balance",
        data: eachmonthsIncome.split(",").map((item) => parseFloat(item)),
        backgroundColor: "rgba(19, 33, 60, 1)",
        borderColor: "rgba(19, 33, 60, 1)",
        type: "line",
      },
      {
        label: "Current Cash Balance",
        data: currentCashBalance.split(",").map((item) => parseFloat(item)),
        backgroundColor: "rgba(250, 180, 70, 1)",
        borderColor: "rgba(250, 180, 70, 1)",
      },
    ],
  };

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
        <p className="mb-5">
          Estimated Runway: {runway}
        </p>
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
