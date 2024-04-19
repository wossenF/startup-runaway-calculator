import React, { useEffect, useRef } from 'react';
import ChartJS from 'chart.js/auto'; // Rename Chart to ChartJS or any other appropriate name

interface BarChartProps {
  datasets: {
    data: number[];
    label: string;
    type?: string;
    fill?: boolean;
    backgroundColor?: string;
    borderColor?: string;
  }[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ datasets, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS>(); // Change Chart to ChartJS

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        // Create a new chart instance
        chartInstance.current = new ChartJS(ctx, { // Change Chart to ChartJS
          type: 'line',
          data: {
            labels: labels,
            datasets: (datasets.map((dataset, index) => ({
              ...dataset,
              backgroundColor: dataset.backgroundColor || `rgba(54, 162, 235, ${(index + 1) * 0.2})`,
              borderColor: dataset.borderColor || `rgba(54, 162, 235, 1)`,
            })) as ChartJS.ChartData<'bar'>),
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
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
