import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useInputStore from "@/store/store";

function CashBalanceInputCard() {

    const setField = useInputStore((state) => state.setField);

    const initialCashBalance = useInputStore((state) => state.initialCashBalance)
    
    console.log(">>>> updated initial cost", initialCashBalance);



    return (
        <div className="cash-balance bg-secondary/50 rounded-lg p-7">
            <form className="grid gap-2">

                <Label className="font-medium text-xl">Cash Balance</Label>

                <p className="text-gray-500 text-sm">
                    Current amount of cash available *
                </p>

                <Input
                    type="number"
                    name="name"
                    placeholder="$1000,000"
                    value={initialCashBalance || ''}
                    onChange={(e) => {
                        setField("initialCashBalance", parseFloat(e.target.value) || 0);
                    }
                    }

                />

                {/* {initialCashBalanceError && (
                <p className="text-red-500 text-sm">{initialCashBalanceError}</p>
              )} */}

            </form>
        </div>
    )
}

export default CashBalanceInputCard;
