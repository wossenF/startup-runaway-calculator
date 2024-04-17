function calculateRunway(userInput) {
    const { initialCashBalance, payRoll, nonPayRoll } = userInput;
    const totalBurnRate = payRoll + nonPayRoll;
    
    if (totalBurnRate <= 0) {
      return Infinity; // Infinite runway if burn rate is non-positive
    }
    
    const runwayMonths = initialCashBalance / totalBurnRate;
    return runwayMonths.toFixed(2); // Round to two decimal places
  }
  function calculateProjectedRevenue(userInput, months) {
    const { monthlyIncome, monthlyGrowthRate } = userInput;
    const growthRateDecimal = monthlyGrowthRate / 100;
    
    const projectedRevenue = [];
    let currentRevenue = monthlyIncome;
    for (let month = 1; month <= months; month++) {
      const growthAmount = currentRevenue * growthRateDecimal;
      currentRevenue += growthAmount;
      projectedRevenue.push({ month, revenue: currentRevenue.toFixed(2) }); // Round to two decimal places
    }
    
    return projectedRevenue;
  }  