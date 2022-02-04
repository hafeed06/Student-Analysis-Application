import React from 'react'
import Chart from 'chart.js/auto';
import { useEffect } from 'react';
import '../../index.css'

const RadarChart = () => {

    const gradesMonth1 = [12, 7, 18] 
    const gradesMonth2 = [15, 13, 14] 
    const labels = ['Technical','Management','Communication']

    const data = {

      labels: labels,
      datasets: [{
        label: 'December',
        data: gradesMonth1,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }, {
        label: 'January',
        data: gradesMonth2,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        plugins: {
          title: {
              display: true,
              text: 'Performance in the last 2 Months by course Type'
          },
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }
    }
  }



    useEffect(() => {
        const ctx3 = document.getElementById('myChart3');
        const myChart3 = new Chart(ctx3, config)
      }, [])
    return (
        <div className='container'>
          <canvas id="myChart3"></canvas>
        </div>
    )
}

export default RadarChart