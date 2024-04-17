import { useEffect } from "react";

const MyComponent = () => {
  const [userInput, setUserInput] = useState({
    // ... your user input state object
  });

  const [runway, setRunway] = useState(0);
  const [projectedRevenue, setProjectedRevenue] = useState([]);

  useEffect(() => {
    // Calculate runway on user input change
    setRunway(calculateRunway(userInput));

    // Calculate projected revenue on user input change (optional number of months)
    setProjectedRevenue(calculateProjectedRevenue(userInput, 12)); // Calculate for 12 months by default
  }, [userInput]);

  // ... rest of your component code

  const chartData = {
    labels: ['Runway (Months)'], // Label for startup runway data point
    datasets: [
      {
        label: 'Startup Runway',
        data: [runway], // Runway value from state
        backgroundColor: 'rgba(255, 215, 0, 0.2)', // Yellow for runway
        borderColor: 'rgba(255, 215, 0, 1)',
      },
      {
        label: 'Projected Monthly Revenue', // Label for projected revenue data
        data: projectedRevenue.map((data:any) => data.revenue), // Revenue values from projectedRevenue
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Dark blue for revenue
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return (
    <>
      {/* Display runway value */}
      <p>Estimated Runway: {runway} months</p>
      {/* Render the BarChart component */}
      <BarChart datasets={chartData.datasets} labels={chartData.labels} />
    </>
  );
};
