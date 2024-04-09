
import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  const BarChart = () => {
    return (
      <div className="w-full max-w-md mx-auto">
        <Bar data={data} />
      </div>
    );
  };
  
  export default BarChart;
    