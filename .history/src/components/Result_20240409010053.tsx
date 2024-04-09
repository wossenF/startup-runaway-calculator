import React from 'react';
import BarChart from './BarChart'; // Assuming BarChart.tsx is in the same directory

const App: React.FC = () => {
  const data = [10, 20, 30, 40, 50];
  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

  return (
    <div>
      <h1>Bar Chart Example</h1>
      <BarChart data={data} labels={labels} />
    </div>
  );
};

export default App;
