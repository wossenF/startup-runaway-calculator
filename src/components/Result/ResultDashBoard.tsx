import { CreditCard, DollarSign, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FinalResult from "./FinalResult";
import useInputStore from "@/store/store";
import handleDownloadClick from "./PdfDownLoad";

export function ResultDashBoard() {
  const {
    totalBurnRate,
    totalProfit,
    initialCashBalance,
    IncomegrowthRateDecimal,
    expensesgrowthRateDecimal,
  } = useInputStore();

  return (
    <main  id="pdf-content">
      <div className="flex flex-1 flex-col gap-4 md:gap-8 md:py-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Burn Rate
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalBurnRate.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {(totalBurnRate / initialCashBalance).toFixed(2)}% loss each
                month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between ">
                <div>
                  <p className="text-2xl font-bold">
                    %{(IncomegrowthRateDecimal * 100).toFixed(2)}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Income Growth Rate
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">%{(expensesgrowthRateDecimal*100).toFixed(2)}</p>

                  <p className="text-xs text-muted-foreground">
                    Expense Growth Rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalProfit.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                6 month total profit
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols">
          <Card
            className="col-span-3 xl:col-span-3"
            x-chunk="dashboard-01-chunk-4"
          >
            <CardContent>
              <FinalResult />
            </CardContent>
          </Card>
        </div>
      </div>
      <button
        className="bg-[#13213C] rounded-sm text-primary-foreground hover:bg-primary/90 p-2 mr-2 float-right"
        onClick={handleDownloadClick}
      >
        Download as PDF
      </button>
    </main>
  );
}
