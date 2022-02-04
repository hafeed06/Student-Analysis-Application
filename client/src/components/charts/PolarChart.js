import React from 'react'
import Chart from 'chart.js/auto';
import { useEffect } from 'react';
import '../../index.css'

const PolarChart = () => {

    const grades = [12, 19, 5, 15, 13, 7]; 
    const subjects = ['September', 'October', 'November', 'December', 'January', 'February']

    const data = {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    const config = {
      type: 'polarArea',
      data: data,
      options: {}
    };



    useEffect(() => {
        const ctx4 = document.getElementById('myChart4');
        const myChart4 = new Chart(ctx4, config)
        return () => {
        }
      }, [])
    return (
        <div className='container'>
          <canvas id="myChart4"></canvas>
        </div>
    )
}

export default PolarChart