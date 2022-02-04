import React from 'react'
import Chart from 'chart.js/auto';
import { useEffect } from 'react';
import '../../index.css'

const LineChart = () => {

    const grades = [12, 19, 5, 15, 13, 7]; 
    const subjects = ['September', 'October', 'November', 'December', 'January', 'February']
    useEffect(() => {
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: subjects,
              datasets: [{
                  label: 'Average Grade per Month',
                  data: grades,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(14, 131, 233, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 3
              }]
          },
          options: {
            // animations: {
            //   tension: {
            //     duration: 1000,
            //     easing: 'linear',
            //     from: 1,
            //     to: 0,
            //     loop: true
            //   }
            // },
            scales: {
              y: { // defining min and max so hiding the dataset does not change scale range
                min: 0,
                max: 20
              }
            }
          }
      });
        return () => {
        }
      }, [])
    return (
        <div className='container'>
          <canvas id="myChart"></canvas>
        </div>
    )
}

export default LineChart