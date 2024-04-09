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
            hoverBackgroundColor: "rgba(
        ]
    }
  return (
    <Bar data={data} height={300} options={options}/>
  )
}

export default Result
