import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import BigNumber from 'bignumber.js'
const pow = BigNumber(10).pow(18)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: false,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'ETH Volume',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
}

const formatData = (parsed) => {
  // const headlines = parsed.data[0]
  let data = parsed.data
  data.shift()

  const opt = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }

  const labels = data.map((ele) => {
    let date = new Date(ele[0] * 1000).toLocaleString([], opt)
    return date.split(', ')
  })
  const values = data.map((ele) => BigNumber(ele[1]).div(pow).toFixed(2))

  const dataset = []
  labels.forEach((ele, i) => {
    dataset.push([ele, values[i]])
  })

  return {
    labels: labels,
    datasets: [
      {
        label: 'ETH',
        data: dataset,
        borderColor: 'rgba(147,24,108,255)',
        backgroundColor: 'rgba(147,24,108,255)',
      },
    ],
  }
}

const Chart = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const loadcsv = async () => {
      const response = await fetch('/data/snapshots.csv')
      const reader = response.body.getReader()
      const result = await reader.read()
      const decoder = new TextDecoder('utf-8')
      const csv = await decoder.decode(result.value)
      const parsed = Papa.parse(csv)
      setData(formatData(parsed))
    }
    loadcsv()
  }, [])

  return (
    <div
      style={{
        width: '80vw',
        maxWidth: '800px',
        padding: '20px 0px 20px 0px',
      }}
    >
      {data && <Line options={chartOptions} data={data} />}
    </div>
  )
}

export default Chart
