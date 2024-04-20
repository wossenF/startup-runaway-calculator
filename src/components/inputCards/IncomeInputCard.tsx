import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import useInputStore from '@/store/store';

function IncomeInputCard() {

    const setField = useInputStore((state) => state.setField);

   

    return (
        <div className="income bg-secondary/50 rounded-lg p-7">
            <Label className="font-medium text-xl">Income</Label>
            <form className="monthly-income grid gap-2 pt-5">
                <Label className="">Monthly Income</Label>
                <p className="text-gray-500 text-sm">
                    Current amount of cash available
                </p>
                <Input
                    type="number"
                    name="name"
                    placeholder="$0.00"
                    onChange={(e) => {
                        setField("monthlyIncome", parseFloat(e.target.value) || 0);
                    }}
                />
            </form>

            <form className="growth-rate grid gap-2 pt-5">
                <Label>Monthly Growth Rate</Label>
                <p className="text-gray-500 text-sm">
                    percentage increase in monthly revenue
                </p>
                <Input
                    type="number"
                    name="name"
                    placeholder="%"
                    onChange={(e) => {
                        setField("monthlyGrowthRate", parseFloat(e.target.value) || 0);
                    }}
                />
            </form>
        </div>
    )
}

export default IncomeInputCard