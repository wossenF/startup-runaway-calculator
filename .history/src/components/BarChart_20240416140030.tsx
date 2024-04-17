import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { calculateRunway, calculateProjectedRevenue } from ;
interface BarChartProps {
  datasets: {
    data: number[];
    label: string;
    backgroundColor: string;
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
            labels: labels,
            datasets: datasets.map(dataset => ({
              label: dataset.label,
              data: dataset.data,
              backgroundColor: dataset.backgroundColor,
              borderWidth: 1
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
