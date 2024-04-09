import React from 'react';
import { Bar } from 'react-chartjs-2';

const Result = () => {
    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May"
        ],
        datasets: [
            {
                label: "Startup Runaway",
                backgroundColor: "#4c5360", // grey
                borderColor: "#4c5360", // black
                hoverBackgroundColor: "rgba(76, 175, 80, 0.9)",
                hoverBorderColor: "rgba(76, 175, 80, 0.9)",
                data: [50, 65, 130, 90, 100]
            },
            {
                label: "Startup Burn Rate",
                backgroundColor: "#f44336", // red
                borderColor: "#f44336", // red
                hoverBackgroundColor: "rgba(244, 67, 54, 0.9)",
                hoverBorderColor: "rgba(244, 67, 54, 0.9)",
                data: [30, 45, 70, 50, 60]
            }
        ]
    };

    const options = {};

    return <Bar data={data} height={300} options={options} />;
};

export default Result;
