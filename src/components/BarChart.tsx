import React, { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
  datasets: {
    data: any[];
    label: string;
    type?: string;
    fill?: boolean;
  }[];
  labels: string[];
  colors?: string[];
}

const BarChart: React.FC<BarChartProps> = ({ datasets, labels, colors }) => {
  const [options, setOptions] = useState<any>({
    chart: {
      height: 400,
      type: 'bar',
      toolbar: {
        show: false, // Disable the toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      labels: {
        formatter: (value: number) => value.toFixed(2),
      },
    },
    colors: colors || undefined, // Set the colors based on the prop if provided
    dataLabels: {
      enabled: false, // Disable data labels by default
    },
    tooltip: {
      enabled: true, // Enable tooltip to display values on hover
    },
  });

  const [series, setSeries] = useState<any>([]);

  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chartData = datasets.map((dataset, index) => ({
      name: dataset.label,
      data: dataset.data,
      color: colors ? colors[index] : undefined, // Set the color based on the prop if provided
    }));

    setSeries(chartData);
  }, [datasets, colors]);

  useEffect(() => {
    if (chartRef.current) {
      const apexChart = chartRef.current?.chart;
      apexChart?.updateOptions(options);
    }
  }, [options]);

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={400}
      ref={chartRef}
    />
  );
};

export default BarChart;
