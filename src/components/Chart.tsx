import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';
export interface DataPoint {
    [key: string]: number | string;
}

interface graphProps {
    datasets: DataPoint[]
}

function Chart({ datasets }: graphProps) {
    const validSeries: any = [];
    const dataset = datasets[0]

    const categories = datasets.map((dataset) => dataset.month)

    const dataField = datasets.map((dataset) => dataset.value)
    validSeries.push({
        name: categories,
        data: dataField
    });

    const [chartState, setChartState] = useState({

        series: validSeries,
        options: {
            stroke: {
                width: 0.5,
                curve: "smooth",
                colors: ["#04ad59", "#127af0", "#f3dc09", "#f37209"],
                size: "20%",
                strokeWidth: 1,
                lineCap: "butt",
            },
            yaxis: {
                labels: {
                    formatter: function (validSeries: any) {
                        if (Math.abs(validSeries) >= 1.0e+9) {
                            return (validSeries / 1.0e+9).toFixed(1) + "B";
                        } else if (Math.abs(validSeries) >= 1.0e+6) {
                            return (validSeries / 1.0e+6).toFixed(1) + "M";
                        } else if (Math.abs(validSeries) >= 1.0e+3) {
                            return (validSeries / 1.0e+3).toFixed(1) + "K";
                        } else {
                            return validSeries.toFixed(2); // Rounding to two digits if the number is less than 1000
                        }
                    },
                },
            },
          
            xaxis: {
                // type: 'text',
              
                categories: categories,
                // tickAmount: 10,
                // labels: {
                //   formatter: function (value: any, timestamp: any, opts: any) {
                //     // return opts.dateFormatter(new Date(timestamp), 'dd MMM')
                //     return timestamp;
                //   }
                // }
            },

            // title: {
            //   text: dataset.name,
            //   align: 'left',
            //   style: {
            //     fontSize: "16px",
            //     color: '#666'
            //   }
            // },

            markers: {
                size: 4,
                colors: ["#04ad59", "#127af0", "#f3dc09", "#f37209"],
                // strokeColors: ['#e9f2ee', '#e9f2ee', '#e9f2ee'],

                hover: {
                    size: 5,
                    sizeOffset: 0,
                },
                strokeWidth: 1.5,
            },
            fill: {
                colors: ["#04ad59", "#127af0", "#f3dc09", "#f37209"],
                opacity: 0.9,
                type: "solid",
                gradient: {
                    colors: ["#04ad59", "#127af0", "#f3dc09", "#f37209"],
                    type: "horizontal",
                    shadeIntensity: 0,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 100],
                    colorStops: [],
                    width: 1,
                },
            },
            // yaxis: [

            // ]
        },

    })
    

    return (
        <div>
            <ReactApexChart
                options={chartState.options}
                series={chartState.series}
                type="bar"
                height={300}
            // width={900}
            />
        </div>
    )
}

export default Chart