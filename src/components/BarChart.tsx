import React, { useEffect, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';

interface BarChartProps {
  datasets: {
    data: any[];
    label: string;
    type?: string;
    fill?: boolean;
    backgroundColor?: string;
    borderColor?: string;
  }[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ datasets, labels }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts>();

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new ApexCharts(chartRef.current, {
        chart: {
          type: 'line',
          height: '300', // Adjust the height as desired
        },
        series: datasets.map((dataset, index) => ({
          name: dataset.label,
          type: dataset.type || 'column',
          data: dataset.data,
          fill: dataset.fill || false,
          backgroundColor: dataset.backgroundColor || `rgba(54, 162, 235, ${(index + 1) * 0.2})`,
          borderColor: dataset.borderColor || `rgba(54, 162, 235, 1)`,
        })),
        xaxis: {
          categories: labels,
        },
        yaxis: {
          show: true,
          labels: {
            formatter: (value) => value.toFixed(2),
          },
        },
      } as ApexOptions);

      chartInstance.current.render();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datasets, labels]);

  return <div ref={chartRef} />;
};

export default BarChart;