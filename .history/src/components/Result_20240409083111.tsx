import React from 'react';
import BarChart from './BarChart'; 

const Result: React.FC = () => {
  const data = [50, 20, 80, 40, 50,60,10,25,45,24,41,,11];
  const labels = ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'];

  return (
    <div>
      <h1>Bar Chart Example</h1>
      <BarChart data={data} labels={labels} />
    </div>
  );
};

export default Result;
