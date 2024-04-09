import React from 'react'
import {Bar} from 'react-chartjs-2';
const Result = () => {
    const data={
        labels:[
            "juanuary",
            "february",
            "march",
            "april",
            "may"
        ],
        datasets: [
          {
            label: "Rainfall(mm)",
            backgroundColor: "#4c5360", //grey
            borderColor: "#4c5360",//black
            hoverBackgroundColor: "rgba(76,175,80,0.9)",
            hoverBorderColor: "rgba(76,175,80,0.9)",
            data:[50,65,130,90,100]
          }
        ]
      };
      const options
      return <Bar data={data} height={300} />

    }
 
  

export default Result
