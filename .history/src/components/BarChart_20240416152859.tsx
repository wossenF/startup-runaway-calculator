import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
interface BarChartProps {
  datasets: {
    data: number[];
    label: string;
  }[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ datasets, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        // Create a new chart instance
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Runway (Months)'],
  datasets: [
    {
      label: 'Startup Runway',
      data: [runway],
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      borderColor: 'rgba(255, 215, 0, 1)',
    },
    {
      label: 'Projected Monthly Revenue',
      data: projectedRevenue.map((data) => data.revenue),
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Provide a default color
      borderColor: 'rgba(54, 162, 235, 1)',
    },
  ],
            }))
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datasets, labels]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
