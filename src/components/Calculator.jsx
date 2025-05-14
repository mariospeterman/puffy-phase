import React, { useState, useEffect, useCallback } from 'react';

export default function Calculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [lockPeriod, setLockPeriod] = useState(10); // Years
  const [results, setResults] = useState({
    totalContributed: 0,
    issuanceFees: 0,
    performanceFees: 0,
    totalFees: 0,
    estimatedValue: 0,
    estimatedProfit: 0
  });

  // Simplified BTC historical average annual return (this would ideally be calculated from real historical data)
  const historicalBTCReturn = 0.25; // 25% annual average (simplified for example)
  const performanceFee = 0.20; // 20% performance fee on profit
  const issuanceFee = 0.05; // 5% issuance fee

  // Format numbers with thousands separator and 2 decimal places
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateEstimates = useCallback(() => {
    const monthlyPayments = lockPeriod * 12;
    const totalContributed = monthlyContribution * monthlyPayments;
    
    // Calculate issuance fee total
    const issuanceFeesTotal = totalContributed * issuanceFee;
    
    // Amount invested after issuance fee
    const netInvestment = totalContributed - issuanceFeesTotal;
    
    // Calculate compounded return with monthly contributions
    let accumulatedValue = 0;
    for (let month = 1; month <= monthlyPayments; month++) {
      // Add this month's contribution after issuance fee
      const thisMonthContribution = monthlyContribution * (1 - issuanceFee);
      
      // Grow existing value for one month
      const monthlyRate = Math.pow(1 + historicalBTCReturn, 1/12) - 1;
      accumulatedValue = accumulatedValue * (1 + monthlyRate) + thisMonthContribution;
    }
    
    // Calculate gross profit (before performance fee)
    const grossProfit = accumulatedValue - netInvestment;
    
    // Apply performance fee only to the profit
    const performanceFeesTotal = grossProfit * performanceFee;
    
    // Calculate final value after all fees
    const finalValue = accumulatedValue - performanceFeesTotal;
    
    // Calculate net profit after all fees
    const netProfit = finalValue - netInvestment;
    
    // Calculate total fees
    const totalFees = issuanceFeesTotal + performanceFeesTotal;
    
    setResults({
      totalContributed: totalContributed,
      issuanceFees: issuanceFeesTotal,
      performanceFees: performanceFeesTotal,
      totalFees: totalFees,
      estimatedValue: finalValue,
      estimatedProfit: netProfit
    });
  }, [monthlyContribution, lockPeriod]);

  useEffect(() => {
    calculateEstimates();
  }, [calculateEstimates]);

  return (
    <div className="bg-white dark:bg-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
      <div className="p-6 bg-primary-500 text-white">
        <h3 className="text-2xl font-bold font-display mb-2">Retirement Calculator</h3>
        <p className="opacity-90">See how your BTC investment could grow over time</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark/70 dark:text-light/70 mb-2">
            Monthly Contribution (€)
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-dark/60 dark:text-light/60">€50</span>
            <span className="font-medium text-primary-600">€{monthlyContribution}</span>
            <span className="text-xs text-dark/60 dark:text-light/60">€500</span>
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-dark/70 dark:text-light/70 mb-2">
            Lock Period (Years)
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[5, 10, 15, 20].map((years) => (
              <button
                key={years}
                onClick={() => setLockPeriod(years)}
                className={`py-2 px-4 rounded-lg border transition ${
                  lockPeriod === years
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white dark:bg-dark/60 text-dark dark:text-light border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                {years} Years
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-lg">
            <p className="text-sm text-dark/70 dark:text-light/70 mb-1">Total Contributed</p>
            <p className="text-2xl font-bold font-display">€{formatCurrency(results.totalContributed)}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-lg">
            <p className="text-sm text-dark/70 dark:text-light/70 mb-1">Total Fees</p>
            <p className="text-2xl font-bold font-display">€{formatCurrency(results.totalFees)}</p>
            <div className="flex flex-col mt-1">
              <span className="text-xs text-dark/60 dark:text-light/60">
                {issuanceFee * 100}% Issuance: €{formatCurrency(results.issuanceFees)}
              </span>
              <span className="text-xs text-dark/60 dark:text-light/60">
                {performanceFee * 100}% Performance: €{formatCurrency(results.performanceFees)}
              </span>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg col-span-2">
            <p className="text-sm text-dark/70 dark:text-light/70 mb-1">Estimated Final Value</p>
            <p className="text-3xl font-bold font-display text-secondary-600 dark:text-secondary-400">
              €{formatCurrency(results.estimatedValue)}
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
              +€{formatCurrency(results.estimatedProfit)} profit (after fees)
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-dark/50 dark:text-light/50 text-center">
          <p>Based on historical BTC performance. Not a guarantee of future returns.</p>
          <p>25% annual returns used for demonstration purposes.</p>
          <p className="mt-1">Fee structure: {issuanceFee * 100}% issuance fee on deposits, {performanceFee * 100}% performance fee only on profits.</p>
        </div>
      </div>
    </div>
  );
} 