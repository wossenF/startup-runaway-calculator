function calculateRunway(userInput) {
    const { initialCashBalance, payRoll, nonPayRoll } = userInput;
    const totalBurnRate = payRoll + nonPayRoll;
    
    if (totalBurnRate <= 0) {
      return Infinity; // Infinite runway if burn rate is non-positive
    }
    
    const runwayMonths = initialCashBalance / totalBurnRate;
    return runwayMonths.toFixed(2); // Round to two decimal places
  }
  