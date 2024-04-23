import { z } from 'zod';

// Custom Zod schema to allow shorthand notation for large numbers
const NumberOrShorthand = z
  .string()
  .refine((value) => {
    const shorthandRegex = /^-?\d+(\.\d+)?[kmbt]$/i;
    return shorthandRegex.test(value);
  }, {
    message: "Value must be a number or a valid shorthand representation (e.g., 10k, 5m, 2b, 100t).",
  })
  .transform((value) => {
    const multiplier: Record<string, number> = {
      'k': 1000,
      'm': 1000000,
      'b': 1000000000,
      't': 1000000000000,
    };

    const numericValue = parseFloat(value);
    const unit = value.charAt(value.length - 1).toLowerCase();

    if (multiplier.hasOwnProperty(unit)) {
      return numericValue * multiplier[unit];
    }

    // Refine only after transformation (if number)
    if (!isNaN(numericValue)) {
      return numericValue;
    } else {
      throw new Error("Invalid number or shorthand representation!");
    }
  });

export const InputSchema = z.object({
  initialCashBalance: NumberOrShorthand,
  monthlyIncome: NumberOrShorthand,
  monthlyGrowthRate: z.number().min(0).max(100),
  cogsPercentage: z.number().min(0).max(100),
  payRoll: NumberOrShorthand,
  nonPayRoll: NumberOrShorthand,
  fundraisingAmount: NumberOrShorthand.optional(),
  monthlyCompensation: NumberOrShorthand.optional(),
  nonPayrollReduction: NumberOrShorthand.optional(),
  nonPayrollReductionTimeline: z.number().min(0).max(12).optional(),
  fundraisingTimeline: z.number().min(0,{message: "value can't be less than zero"}).max(12,{message:"value can't be more than 12"}).optional(),
  newHiresTimeline: z.number().min(0,{message: "value can't be less than zero"}).max(12,{message:"value can't be more than 12"}).optional(),
});

// Define a type for the input data based on the Zod schema
export type InputData = z.infer<typeof InputSchema>;
