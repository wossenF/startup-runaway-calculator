import React from 'react';
import BarChart from './BarChart'; // Assuming BarChart.tsx is in the same directory

const Result: React.FC = () => {
  const data = [10, 20, 30, 40, 50];
  const labels = ['January', 'February', 'March', 'April', 'May',''];

  return (
    <div>
      <h1>Bar Chart Example</h1>
      <BarChart data={data} labels={labels} />
    </div>
  );
};

export default Result;
