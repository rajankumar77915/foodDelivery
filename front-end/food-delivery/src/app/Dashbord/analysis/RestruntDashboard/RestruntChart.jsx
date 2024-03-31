import { useState } from 'react'
import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const RestruntChart = ({RestruntData}) => {

    const [currChart, setCurrChart] = useState("quantity");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataOrder = {
    labels: RestruntData.map((restrunt) => restrunt.itemName),
    datasets: [
      {
        data: RestruntData.map((restrunt) => restrunt.quntity),
        backgroundColor: generateRandomColors(RestruntData.length),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: RestruntData.map((restrunt) => restrunt.itemName),
    datasets: [
      {
        data: RestruntData.map((restrunt) => restrunt.totalprice),
        backgroundColor: generateRandomColors(RestruntData.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }


    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
          <p className="text-lg font-bold text-richblack-5">Visualize</p>
          <div className="space-x-4 font-semibold">
            {/* Button to switch to the "quantity" chart */}
            <button
              onClick={() => setCurrChart("quantity")}
              className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                currChart === "quantity"
                  ? "bg-richblack-700 text-yellow-50"
                  : "text-yellow-400"
              }`}
            >
              Quantity
            </button>
            {/* Button to switch to the "income" chart */}
            <button
              onClick={() => setCurrChart("income")}
              className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                currChart === "income"
                  ? "bg-richblack-700 text-yellow-50"
                  : "text-yellow-400"
              }`}
            >
              Income
            </button>
          </div>
          <div className="relative mx-auto aspect-square h-full w-full">
            {/* Render the Pie chart based on the selected chart */}
            <Pie
              data={currChart === "quantity" ? chartDataOrder : chartIncomeData}
              options={options}
            />
          </div>
        </div>
      )
    }
    

export default RestruntChart
