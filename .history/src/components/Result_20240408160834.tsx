import React from 'react'
import {Bar} from 'react-chartjs-2';
const Result = () => {
    const data={
        labels:[
            "juanuary",
            "february",
            "march",
            "april"
        ]
    }
  return (
    <Bar data={data} height={300} options={options}/>
  )
}

export default Result
