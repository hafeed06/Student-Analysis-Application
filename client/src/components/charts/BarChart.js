import React from 'react'
import Chart from 'chart.js/auto';
import { useEffect } from 'react';
import '../../index.css'

const BarChart = () => {

    const grades = [12, 19, 5, 15, 13, 7]; 
    const labels = ['September', 'October', 'November', 'December', 'January', 'February']

    const data = {
      labels: labels,
      datasets: [{
        label: 'Average grade in the month',
        data: grades,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };



    useEffect(() => {
        const ctx2 = document.getElementById('myChart2');
        const myChart2 = new Chart(ctx2, {
          type: 'bar',
          data: data,
          options: {
            plugins: {
              title: {
                  display: true,
                  text: 'Bar Chart representation of your Average grades in the last 6 months'
              }
          },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
        })
        return () => {
        }
      }, [])
    return (
        <div className='container'>
          <canvas id="myChart2"></canvas>
        </div>
    )
}

export default BarChart